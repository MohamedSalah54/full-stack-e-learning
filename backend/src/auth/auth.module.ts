import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepo } from 'src/db/user/user.repo';
import { UserModel } from 'src/db/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationRepo } from 'src/db/notification/notification.repo';
import { NotificationModel } from 'src/db/notification/notification.model';

@Global()
@Module({
  imports: [UserModel, NotificationModel],
  controllers: [AuthController],
  providers: [AuthService, UserRepo, JwtService, NotificationService,NotificationRepo],
  exports: [UserModel, JwtService, UserRepo],
})
export class AuthModule {}
