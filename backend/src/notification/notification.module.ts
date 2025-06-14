import { Module } from "@nestjs/common";
import { NotificationModel } from "src/db/notification/notification.model";
import { NotificationRepo } from "src/db/notification/notification.repo";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
    imports: [NotificationModel],
  providers: [NotificationRepo,NotificationService],
  controllers: [NotificationController],
})

export class NotificationModule{}