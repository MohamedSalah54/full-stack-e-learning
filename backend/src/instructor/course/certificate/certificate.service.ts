import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SchemaTypes, Types } from 'mongoose';
import { CreateBulkCertificateDto, CreateCertificateDto, UpdateCertificateDto } from './dto';
import { CertificateRepo } from 'src/db/certificate/certificate.repo';
import { UserRepo } from 'src/db/user/user.repo';
import { CourseRepo } from 'src/db/course/course.repo';
import { TCertificate } from 'src/db/certificate/certificate.model';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/common/enum';

@Injectable()
export class CertificateService {
  constructor(
    private readonly repo: CertificateRepo,
    private readonly userRepo: UserRepo,
    private readonly courseRepo: CourseRepo,
    private readonly notificationservice: NotificationService



  ) { }

  private generateSerialNumber(userId: Types.ObjectId, courseId: Types.ObjectId) {
    return `CERT-${courseId.toString().slice(-4)}-${userId.toString().slice(-4)}-${Date.now()}`;
  }


  async create(dto: CreateCertificateDto) {
    try {
      const userId = new Types.ObjectId(dto.userId);
      const courseId = new Types.ObjectId(dto.courseId);

      const userExists = await this.userRepo.findOne({ filter: { _id: userId } });
      if (!userExists) {
        throw new BadRequestException('User does not exist');
      }

      const courseExists = await this.courseRepo.findOne({ filter: { _id: courseId } });
      if (!courseExists) {
        throw new BadRequestException('Course does not exist');
      }

      const certificateExists = await this.repo.findOne({ filter: { userId, courseId } });
      if (certificateExists) {
        throw new BadRequestException('Certificate already exists for this user and course');
      }

      const preparedDto = {
        ...dto,
        userId,
        courseId,
      };

      return await this.repo.create(preparedDto);

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create certificate: ' + error.message);
    }
  }


  async createBulkCertificates(dto: CreateBulkCertificateDto) {
    const courseObjectId = new Types.ObjectId(dto.courseId);
    const objectUserIds = dto.userIds.map(id => new Types.ObjectId(id));

    const courseExists = await this.courseRepo.findOne({ filter: { _id: courseObjectId } });
    if (!courseExists) throw new BadRequestException('Course does not exist');

    const users = await this.userRepo.find({
      filter: { _id: { $in: objectUserIds } },
      projection: { firstName: 1, lastName: 1 },
      limit: dto.userIds.length,
    });

    if (users.length !== dto.userIds.length) {
      throw new BadRequestException('One or more users do not exist');
    }

    const existingCertificates = await this.repo.find({
      filter: { courseId: courseObjectId, userId: { $in: objectUserIds } },
      projection: { userId: 1 },
      limit: dto.userIds.length,
    });

    const existingUserIds = new Set(existingCertificates.map(c => c.userId.toString()));

    const certificatesToCreate: Partial<TCertificate>[] = users
      .filter(user => !existingUserIds.has(user._id.toString()))
      .map(user => ({
        userId: user._id,
        courseId: courseObjectId,
        issueDate: new Date(),
        certificateUrl: dto.certificateUrl,
        serialNumber: this.generateSerialNumber(user._id, courseObjectId),
      }));

    if (certificatesToCreate.length === 0) {
      throw new BadRequestException('All users already have certificates for this course');
    }

    const createdCertificates = await this.repo.createBulk(certificatesToCreate);

    for (const cert of createdCertificates) {
      if (!cert.userId) continue;

      const user = users.find(u => u._id.toString() === cert.userId!.toString());
      const userName = user ? `${user.firstName} ${user.lastName}` : 'User';

      await this.notificationservice.createNotification({
        userId: cert.userId,
        message: `Congratulations ${userName}! You have been awarded a certificate for the course "${courseExists.title}".`,
        type: NotificationType.SYSTEM,
      });
    }
    return createdCertificates;
  }



  async findAll(courseId: string) {
    try {
      const filter = { courseId: new Types.ObjectId(courseId) };
      return await this.repo.find({
        filter,
        populate: [{ path: 'userId' }, { path: 'courseId' }],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch certificates: ' + error.message,
      );
    }
  }

  async findByCourseAndUser(courseId: string, userId: string) {
    try {
      const certificate = await this.repo.findOne({
        filter: {
          courseId: new Types.ObjectId(courseId),
          userId: new Types.ObjectId(userId),
        },
        populate: [{ path: 'userId' }, { path: 'courseId' }],
      });
      if (!certificate)
        throw new NotFoundException(
          `Certificate not found for this user and course`,
        );
      return certificate;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        'Invalid IDs or failed to fetch certificate: ' + error.message,
      );
    }
  }


  async findByUser(userId: string) {
    try {
      return await this.repo.find({
        filter: { userId: new Types.ObjectId(userId) },
        populate: [{ path: 'courseId' }],
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch certificates for user: ' + error.message);
    }
  }

  async update(id: string, dto: UpdateCertificateDto) {
    try {
      const updatedCertificate = await this.repo.updateOne({
        filter: { _id: new Types.ObjectId(id) },
        update: dto,
      });
      if (!updatedCertificate) throw new NotFoundException(`Certificate with id ${id} not found`);
      return updatedCertificate;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to update certificate: ' + error.message);
    }
  }

  async delete(id: string) {
    try {
      const result = await this.repo.deleteOne({ _id: new Types.ObjectId(id) });
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Certificate with id ${id} not found`);
      }
      return;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to delete certificate: ' + error.message);
    }
  }

  async deleteBulkCertificatesByCourse(courseId: string) {
    const courseObjectId = new Types.ObjectId(courseId);

    const courseExists = await this.courseRepo.findOne({ filter: { _id: courseObjectId } });
    if (!courseExists) {
      throw new BadRequestException('Course does not exist');
    }

    const result = await this.repo.delete({ courseId: courseObjectId });

    return result;
  }


}
