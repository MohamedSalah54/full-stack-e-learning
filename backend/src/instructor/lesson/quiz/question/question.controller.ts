import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/index';

@Controller('quiz/:quizId/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(
    @Param('quizId') quizId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    const question = await this.questionService.createQuestion({ ...dto, quizId });
    return {
      message: 'Question created successfully',
      statusCode: 201,
      data: question,
    };
  }

  @Post('bulk')
  async createMultipleQuestions(
    @Param('quizId') quizId: string,
    @Body() dtos: CreateQuestionDto[],
  ) {
    const questionsWithQuizId = dtos.map(dto => ({ ...dto, quizId }));
    const questions = await this.questionService.createMultipleQuestions(questionsWithQuizId);
    return {
      message: 'Questions created successfully',
      statusCode: 201,
      data: questions,
    };
  }

  @Get()
  async getQuestions(@Param('quizId') quizId: string) {
    const questions = await this.questionService.findByQuizId(quizId);
    return {
      message: 'Questions fetched successfully',
      statusCode: 200,
      data: questions,
    };
  }

  @Get(':id')
  async getQuestionById(
    @Param('quizId') quizId: string,
    @Param('id') id: string,
  ) {
    const question = await this.questionService.findById(quizId, id);
    return {
      message: 'Question fetched successfully',
      statusCode: 200,
      data: question,
    };
  }

  @Patch(':id')
  async updateQuestion(
    @Param('quizId') quizId: string,
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    const question = await this.questionService.update(quizId, id, dto);
    return {
      message: 'Question updated successfully',
      statusCode: 200,
      data: question,
    };
  }

  @Delete(':id')
  async deleteQuestion(
    @Param('quizId') quizId: string,
    @Param('id') id: string,
  ) {
    const result = await this.questionService.deleteQuestion(quizId, id);
    return {
      message: 'Question deleted successfully',
      statusCode: 200,
      data: result,
    };
  }
}
