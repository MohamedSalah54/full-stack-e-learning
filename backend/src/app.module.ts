import { Module } from '@nestjs/common';
import { GlobalModule } from './global.module';
import { AuthModule } from './auth/auth.module';
import { InstructorModule } from './instructor/instructor.module';
import { adminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    GlobalModule, 
    AuthModule, 
    InstructorModule,
    adminModule,
    UserModule, 
    NotificationModule,
    EnrollmentModule,
    PaymentModule
   ],
})
export class AppModule {}
