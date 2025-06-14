import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from '../base.repo';
import { Enrollment, TEnrollment } from './enrollment.model';

export class EnrollmentRepo extends BaseRepo<TEnrollment> {
    findById(enrollmentId: string) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectModel(Enrollment.name)
        private readonly enrollmentModel: Model<TEnrollment>,
    ) {
        super(enrollmentModel);
    }
}
