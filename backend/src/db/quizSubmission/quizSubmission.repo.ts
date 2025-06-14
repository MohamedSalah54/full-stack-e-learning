import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from '../base.repo';
import { QuizSubmission } from './quizSubmission.model';

@Injectable()
export class QuizSubmissionRepo extends BaseRepo<QuizSubmission> {
  constructor(@InjectModel(QuizSubmission.name) model: Model<QuizSubmission>) {
    super(model);
  }
}
