import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionModel } from 'src/db/question/question.model';

@Module({
  imports: [QuestionModel],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
