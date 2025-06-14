import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { CreateNotificationDto } from "./dto";
import { NotificationRepo } from "src/db/notification/notification.repo";

@Injectable()
export class NotificationService{

     constructor(private readonly notificationRepo: NotificationRepo) {}

  async createNotification(dto: CreateNotificationDto) {
    try {
      if (!dto.userId || !Types.ObjectId.isValid(dto.userId)) {
        throw new BadRequestException('Invalid or missing userId');
      }

      if (!dto.message || !dto.message.trim()) {
        throw new BadRequestException('Message is required');
      }

      const notification = {
        ...dto,
        userId: new Types.ObjectId(dto.userId),
      };

      return await this.notificationRepo.create(notification);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create notification');
    }
  }

  async getUserNotifications(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    const notifications = await this.notificationRepo.find({
      filter: { userId },
      sort: { createdAt: -1 },
    });

    return notifications;
  }

  async markAsRead(notificationId: string, userId: string) {
  const notification = await this.notificationRepo.findOne({
    filter: {
      _id: new Types.ObjectId(notificationId),
      userId: new Types.ObjectId(userId),
    },
  });

  if (!notification) {
    throw new NotFoundException('Notification not found or does not belong to this user');
  }

  notification.isRead = true;
  await notification.save();

  return notification;
}

}