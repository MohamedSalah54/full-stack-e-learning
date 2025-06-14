import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from '../base.repo';
import { Model } from 'mongoose';
import { Notification, TNotification } from './notification.model';

export class NotificationRepo extends BaseRepo<TNotification> {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<TNotification>,
  ) {
    super(notificationModel);
  }
}
