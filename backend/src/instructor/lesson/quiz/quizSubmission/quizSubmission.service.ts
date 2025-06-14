import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from 'src/db/question/question.model';
import { Quiz } from 'src/db/quiz/quiz.model';
import { QuizSubmissionRepo } from 'src/db/quizSubmission/quizSubmission.repo';
import { CreateQuizSubmissionDto } from './dto';
import { QuestionRepo } from 'src/db/question/question.repo';

@Injectable()
export class QuizSubmissionService {
  constructor(
    private readonly submissionRepo: QuizSubmissionRepo,
    private readonly questionRepo: QuestionRepo,

    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
  ) {}

  private isValidObjectId(id: string) {
    return Types.ObjectId.isValid(id);
  }



  async submitQuiz(dto: CreateQuizSubmissionDto) {
    try {
      if (!this.isValidObjectId(dto.quizId) || !this.isValidObjectId(dto.studentId)) {
        throw new BadRequestException('Invalid quizId or studentId');
      }

      const quiz = await this.quizModel.findById(dto.quizId);
      if (!quiz) throw new NotFoundException('Quiz not found');

      const processedAnswers = await Promise.all(
        dto.answers.map(async (submittedAnswer) => {
          if (!this.isValidObjectId(submittedAnswer.questionId)) {
            return null; 
          }

          const question = await this.questionRepo.findOne({
            filter: {
              _id: new Types.ObjectId(submittedAnswer.questionId),
              quizId: new Types.ObjectId(dto.quizId),
            },
          });

          if (!question) return null;

          const isCorrect =
            question.correctAnswer.toLowerCase() === submittedAnswer.answer.toLowerCase();
          const marksObtained = isCorrect ? question.marks : 0;

          return {
            questionId: question._id,
            answer: submittedAnswer.answer,
            isCorrect,
            marksObtained,
          };
        }),
      );

      const validAnswers = processedAnswers.filter(
        (a): a is NonNullable<typeof a> => a !== null,
      );

      if (validAnswers.length === 0) {
        throw new BadRequestException('No valid answers submitted');
      }

      const obtainedMarks = validAnswers.reduce((acc, curr) => acc + curr.marksObtained, 0);

      const submission = await this.submissionRepo.create({
        quizId: new Types.ObjectId(dto.quizId),
        studentId: new Types.ObjectId(dto.studentId),
        answers: validAnswers,
        totalMarks: quiz.totalMarks,
        obtainedMarks,
        isPassed: obtainedMarks >= quiz.passingScore,
      });

      return submission;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to submit quiz');
    }
  }





  async getSubmissionsByQuiz(quizId: string) {
    if (!this.isValidObjectId(quizId)) {
      throw new BadRequestException('Invalid quizId');
    }
    return this.submissionRepo.find({
      filter: { quizId: new Types.ObjectId(quizId) },
      options: { sort: { createdAt: -1 } },
    });
  }



  

  async getStudentSubmissionForQuiz(quizId: string, studentId: string) {
    if (!this.isValidObjectId(quizId) || !this.isValidObjectId(studentId)) {
      throw new BadRequestException('Invalid quizId or studentId');
    }
    const submission = await this.submissionRepo.findOne({
      filter: {
        quizId: new Types.ObjectId(quizId),
        studentId: new Types.ObjectId(studentId),
      },
      populate: [
        { path: 'studentId', select: 'name email' },
        { path: 'answers.questionId', select: 'text correctAnswer marks' },
      ],
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return submission;
  }
}
