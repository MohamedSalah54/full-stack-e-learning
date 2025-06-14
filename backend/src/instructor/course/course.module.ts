import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseModel } from 'src/db/course/course.model';
import { CourseRepo } from 'src/db/course/course.repo';
import { CloudService } from 'src/common/services/cloud/cloudinary';
import { CertificateModule } from './certificate/certificate.module';

@Module({
  imports: [CourseModel, CertificateModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepo, CloudService],
})
export class CourseModule {}
