import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from '../base.repo';
import { Course, TCourse } from './course.model';
import { Model } from 'mongoose';

export class CourseRepo extends BaseRepo<TCourse> {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<TCourse>,
  ) {
    super(courseModel);
  }
    async countByInstructor(instructorId: string): Promise<number> {
    return this.courseModel.countDocuments({ instructor: instructorId });
  }
}
