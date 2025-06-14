import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types, SchemaTypes } from 'mongoose';
import { User } from '../user/user.model';
import { NotificationType } from 'src/common/enum';



@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Notification {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ type: String, enum: NotificationType, required: true })
  type: NotificationType;

  @Prop({ default: false })
  isRead: boolean;
}

export const notificationSchema = SchemaFactory.createForClass(Notification);

export type TNotification = HydratedDocument<Notification> & Document;

export const NotificationModel = MongooseModule.forFeature([
  { name: Notification.name, schema: notificationSchema },
]);
