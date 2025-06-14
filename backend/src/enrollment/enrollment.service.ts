import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateEnrollmentDto,
} from './dto';
import { Types } from 'mongoose';
import { EnrollmentRepo } from 'src/db/enrollment/enrollment.repo';
import { CompletedLessonRepo } from 'src/db/completedLesson/completedLesson.repo';
import { SectionRepo } from 'src/db/section/section.repo';
import { LessonRepo } from 'src/db/lesson/lesson.repo';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly enrollmentRepo: EnrollmentRepo,
    private readonly sectionRepo: SectionRepo,
    private readonly lessonRepo: LessonRepo,
    private readonly completedLessonRepo: CompletedLessonRepo,



  ) { }

  async enroll(dto: CreateEnrollmentDto) {
    try {
      if (!dto.userId || !Types.ObjectId.isValid(dto.userId)) {
        throw new BadRequestException('Invalid or missing userId');
      }

      if (!dto.courseId || !Types.ObjectId.isValid(dto.courseId)) {
        throw new BadRequestException('Invalid or missing courseId');
      }

      const existingEnrollment = await this.enrollmentRepo.findOne({
        filter: {
          userId: new Types.ObjectId(dto.userId),
          courseId: new Types.ObjectId(dto.courseId),
        },
      });

      if (existingEnrollment) {
        throw new BadRequestException('User is already enrolled in this course');
      }

      return await this.enrollmentRepo.create({
        ...dto,
        userId: new Types.ObjectId(dto.userId),
        courseId: new Types.ObjectId(dto.courseId),
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to enroll');
    }
  }



  async updateProgress(enrollmentId: string) {
    try {
      if (!enrollmentId || !Types.ObjectId.isValid(enrollmentId)) {
        throw new BadRequestException('Invalid enrollment ID');
      }

      const enrollment = await this.enrollmentRepo.findOne({
        filter: { _id: new Types.ObjectId(enrollmentId) },
        populate: [{ path: 'courseId' }],
      });

      if (!enrollment) {
        throw new NotFoundException('Enrollment not found');
      }

      const userId = enrollment.userId;
      const courseId = enrollment.courseId._id;

      const sections = await this.sectionRepo.find({
        filter: { courseId: courseId },
        projection: { _id: 1 },
      });

      const allLessonIds: Types.ObjectId[] = [];

      for (const section of sections) {
        const lessons = await this.lessonRepo.find({
          filter: { sectionId: section._id },
          projection: { _id: 1 },
        });

        lessons.forEach(lesson => allLessonIds.push(lesson._id));
      }

      const uniqueLessonIds = Array.from(new Set(allLessonIds.map(id => id.toString()))).map(id => new Types.ObjectId(id));

      const totalLessons = uniqueLessonIds.length;
      if (totalLessons === 0) {
        return {
          message: 'No lessons found in course',
          progress: 0,
        };
      }

      const completedLessonsCount = await this.completedLessonRepo.count({
        userId: new Types.ObjectId(userId),
        lessonId: { $in: uniqueLessonIds },
      });
      const progress = (completedLessonsCount / totalLessons) * 100;

      await this.enrollmentRepo.updateOne({
        filter: { _id: enrollmentId },
        update: { progress: +progress.toFixed(2) },
      });

      return {
        message: 'Enrollment progress updated successfully',
        progress: +progress.toFixed(2),
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update progress');
    }
  }




  async getEnrollmentsByUser(userId: string) {
    try {
      if (!userId || !Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('Invalid user ID');
      }

      return await this.enrollmentRepo.find({
        filter: { userId },
        populate: [{ path: 'courseId' }],
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to get user enrollments');
    }
  }

  async getEnrollmentsByCourse(courseId: string) {
    try {
      if (!courseId || !Types.ObjectId.isValid(courseId)) {
        throw new BadRequestException('Invalid course ID');
      }

      return await this.enrollmentRepo.find({
        filter: { courseId },
        populate: [{ path: 'userId' }],
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to get course enrollments');
    }
  }


  async removeEnrollment(id: string) {
    try {
      if (!id || !Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid enrollment ID');
      }

      const result = await this.enrollmentRepo.deleteOne({ _id: id });
      if (!result.deletedCount) {
        throw new NotFoundException('Enrollment not found or already deleted');
      }

      return result;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to remove enrollment');
    }
  }

  
}
