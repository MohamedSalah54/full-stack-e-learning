import { Module } from '@nestjs/common';
import { CertificateRepo } from 'src/db/certificate/certificate.repo';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { CertificateModel } from 'src/db/certificate/certificate.model';
import { CourseRepo } from 'src/db/course/course.repo';
import { CourseModel } from 'src/db/course/course.model';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationRepo } from 'src/db/notification/notification.repo';
import { NotificationModel } from 'src/db/notification/notification.model';

@Module({
  imports: [
    CertificateModel,CourseModel,NotificationModel
  ],
  providers: [CertificateService, CertificateRepo,CourseRepo,NotificationService,NotificationRepo],
  controllers: [CertificateController],
})
export class CertificateModule {}
