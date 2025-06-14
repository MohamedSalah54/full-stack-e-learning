import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizSubmissionService } from './quizSubmission.service';
import { CreateQuizSubmissionDto } from './dto';

@Controller('quiz-submissions')
export class QuizSubmissionController {
  constructor(private readonly quizSubmissionService: QuizSubmissionService) {}

  @Post()
  async submitQuiz(@Body() dto: CreateQuizSubmissionDto) {
    const submission = await this.quizSubmissionService.submitQuiz(dto);
    return {
      message: 'Quiz submitted successfully',
      statusCode: 201,
      data: submission,
    };
  }

  @Get(':quizId')
  async getSubmissionsByQuiz(@Param('quizId') quizId: string) {
    const submissions = await this.quizSubmissionService.getSubmissionsByQuiz(quizId);
    return {
      message: 'Submissions fetched successfully',
      statusCode: 200,
      data: submissions,
    };
  }

  @Get(':quizId/students/:studentId')
  async getStudentSubmission(
    @Param('quizId') quizId: string,
    @Param('studentId') studentId: string,
  ) {
    const submission = await this.quizSubmissionService.getStudentSubmissionForQuiz(quizId, studentId);
    return {
      message: 'Student submission fetched successfully',
      statusCode: 200,
      data: submission,
    };
  }
}
