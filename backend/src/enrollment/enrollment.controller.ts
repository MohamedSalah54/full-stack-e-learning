import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {
    CreateEnrollmentDto,
    UpdateEnrollmentProgressDto,
} from './dto';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollments')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) { }

@Post()
async enroll(@Body() dto: CreateEnrollmentDto) {
  console.log('Received DTO:', dto); // 👈 أضف ده هنا
  const enrollment = await this.enrollmentService.enroll(dto);
  return {
    message: 'Enrollment created successfully',
    statusCode: 201,
    data: enrollment,
  };
}




    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateEnrollmentProgressDto) {
        const enrollment = await this.enrollmentService.updateProgress(id);
        return {
            message: 'Enrollment updated successfully',
            statusCode: 200,
            data: enrollment,
        };
    }

    @Get('user/:userId')
    async getByUser(@Param('userId') userId: string) {
        const enrollments = await this.enrollmentService.getEnrollmentsByUser(userId);
        return {
            message: 'Enrollments fetched successfully',
            statusCode: 200,
            data: enrollments,
        };
    }

    @Get('course/:courseId')
    async getByCourse(@Param('courseId') courseId: string) {
        const enrollments = await this.enrollmentService.getEnrollmentsByCourse(courseId);
        return {
            message: 'Enrollments for course fetched successfully',
            statusCode: 200,
            data: enrollments,
        };
    }



    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.enrollmentService.removeEnrollment(id);
        return {
            message: 'Enrollment deleted successfully',
            statusCode: 200,
        };
    }


}
