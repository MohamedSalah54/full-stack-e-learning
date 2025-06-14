import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, questionSchema } from 'src/db/question/question.model';
import { Quiz, quizSchema } from 'src/db/quiz/quiz.model';
import { QuizSubmission, QuizSubmissionSchema } from 'src/db/quizSubmission/quizSubmission.model';
import { QuizSubmissionRepo } from 'src/db/quizSubmission/quizSubmission.repo';
import { QuizSubmissionController } from './quizSubmission.controller';
import { QuizSubmissionService } from './quizSubmission.service';
import { QuizRepo } from 'src/db/quiz/quiz.repo';
import { QuestionRepo } from 'src/db/question/question.repo';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizSubmission.name, schema: QuizSubmissionSchema },
      { name: Question.name, schema: questionSchema },
      { name: Quiz.name, schema: quizSchema },
    ]),
  ],
  providers: [QuizSubmissionRepo, QuizSubmissionService, QuestionRepo],
  controllers: [QuizSubmissionController],
})
export class QuizSubmissionModule {}
