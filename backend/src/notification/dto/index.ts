import { IsEnum, IsMongoId, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { NotificationType } from 'src/common/enum';

export class CreateNotificationDto {
  @IsMongoId()
  userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  isRead?: boolean;
}
