import { Injectable, ForbiddenException, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto';
import { Types } from 'mongoose';
import { ReviewRepo } from 'src/db/review/review.repo';


@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepo: ReviewRepo) {}

  async createReview(dto: CreateReviewDto) {
    if (!dto.rating || dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5.');
    }

    if (!dto.comment || dto.comment.trim().length === 0) {
      throw new BadRequestException('Comment is required.');
    }

    if (!Types.ObjectId.isValid(dto.userId)) {
      throw new BadRequestException('Invalid userId.');
    }

    if (!Types.ObjectId.isValid(dto.courseId)) {
      throw new BadRequestException('Invalid courseId.');
    }

    const userId = new Types.ObjectId(dto.userId);
    const courseId = new Types.ObjectId(dto.courseId);

    const existingReview = await this.reviewRepo.findOne({
      filter: { userId, courseId },
    });

    if (existingReview) {
      throw new ConflictException('You have already reviewed this course.');
    }

    try {
      const review = await this.reviewRepo.create({
        ...dto,
        userId,
        courseId,
      });

      return {
        message: 'Review submitted successfully.',
        data: review,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create review: ' + error.message);
    }
  }

  async getReviewsByCourse(courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Invalid courseId.');
    }

    const reviews = await this.reviewRepo.find({
      filter: { courseId },
      populate: [{ path: 'userId', select: 'firstName lastName' }],
    });

    if (reviews.length === 0) {
      throw new NotFoundException('No reviews found for this course.');
    }

    return reviews;
  }

  async getUserReviewForCourse(userId: string, courseId: string) {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException('Invalid userId or courseId.');
    }

    const review = await this.reviewRepo.findOne({
      filter: {
        userId: new Types.ObjectId(userId),
        courseId: new Types.ObjectId(courseId),
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found.');
    }

    return review;
  }
}
