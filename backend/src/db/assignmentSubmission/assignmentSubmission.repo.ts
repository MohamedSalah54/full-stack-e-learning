import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from '../base.repo';
import { Model } from 'mongoose';
import { AssignmentSubmission, TassignmentSubmission } from './assignmentSubmission.model';

export class AssignmentSubmissionRepo extends BaseRepo<TassignmentSubmission> {
  constructor(
    @InjectModel(AssignmentSubmission.name) private readonly assignmentSubmissionModel: Model<TassignmentSubmission>,
  ) {
    super(assignmentSubmissionModel);
  }
}
