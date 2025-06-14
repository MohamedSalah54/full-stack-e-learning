import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateNotificationDto } from "./dto";
import { NotificationService } from "./notification.service";

@Controller("notifications")
export class NotificationController{
     constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(@Body() dto: CreateNotificationDto) {
    const notification = await this.notificationService.createNotification(dto)
    return {
        message:"Notification created successfully",
        statusCode:201,
        data:notification
    }
  }

  

  @Get(':userId')
  async getUserNotifications(@Param('userId') userId: string) {
    const notifications = await this.notificationService.getUserNotifications(userId);
    return {
      message: "Notifications fetched successfully",
      statusCode: 200,
      data: notifications,
    };
  }

 @Patch('read/user/:userId/notification/:notificationId')
async markAsRead(
  @Param('userId') userId: string,
  @Param('notificationId') notificationId: string,
) {
  const notification = await this.notificationService.markAsRead(notificationId, userId);

  return {
    message: "Notification marked as read successfully",
    statusCode: 200,
    data: notification,
  };
}

}