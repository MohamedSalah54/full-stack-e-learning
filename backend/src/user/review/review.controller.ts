import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post()
    async create(@Body() dto: CreateReviewDto) {
        const review = await this.reviewService.createReview(dto)
        return {
            message: 'Review created successfully',
            statusCode: 201,
            data: review
        }
    }

    @Get('course/:courseId')
    async getByCourse(@Param('courseId') courseId: string) {
        const reviews = await this.reviewService.getReviewsByCourse(courseId)
        return {
            message: 'Reviews fetched successfully',
            statusCode: 200,
            data: reviews

        }
    }

    @Get(':userId/:courseId')
    async getUserReview(@Param('userId') userId: string, @Param('courseId') courseId: string) {
        const review = await this.reviewService.getUserReviewForCourse(userId, courseId);
        return {
            message: 'Review fetched successfully',
            statusCode: 200,
            data: review
        }
    }
}
