import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TUser } from 'src/db/user/user.model';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { UserRoles } from 'src/common/enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  // @Auth(UserRoles.INSTRUCTOR)
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @CurrentUser() user: TUser,
  ) {
    const course = await this.courseService.create(createCourseDto, user);
    return {
      success: true,
      data: course,
    };
  }

  
  @Get('instructor/:instructorId/count')
  async getCoursesCountByInstructor(
    @Param('instructorId') instructorId: string,
  ) {
    const count =
      await this.courseService.countCoursesByInstructor(instructorId);
    return { success: true, coursesCount: count };
  }

  @Get()
  @Public()
  async find(@Req() request: Request) {
    const courses = await this.courseService.find(request);
    return { success: true, data: courses };
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: Types.ObjectId) {
    const course = await this.courseService.findOne(id);
    return { success: true, data: course };
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateCourseDto: UpdateCourseDto,
    user: TUser = {
      _id: new Types.ObjectId('681c8f7be44544808bebbedc'),
    } as TUser,
  ) {
    const course = await this.courseService.update(id, user, updateCourseDto);
    return { success: true, data: course };
  }

  @Delete(':id')
  @Auth(UserRoles.INSTRUCTOR)
  async delete(@Param('id') id: Types.ObjectId, @CurrentUser() user: TUser) {
    const course = await this.courseService.delete(id, user);
    return { success: true, data: course };
  }
}
