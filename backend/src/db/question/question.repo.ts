import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from '../base.repo';
import { Model } from 'mongoose';
import { Question, TQuestion } from './question.model';

export class QuestionRepo extends BaseRepo<TQuestion> {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<TQuestion>,
  ) {
    super(questionModel);
  }
}
