import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/index';
import mongoose from 'mongoose';
import { BaseRepo } from 'src/db/base.repo';
import { Question } from 'src/db/question/question.model';



@Injectable()
export class QuestionService extends BaseRepo<Question> {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
  ) {
    super(questionModel);
  }

  private isValidObjectId(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
  }



  async createQuestion(dto: CreateQuestionDto & { quizId: string }) {
    try {
      if (!this.isValidObjectId(dto.quizId)) {
        throw new BadRequestException('Invalid quizId');
      }
      const question = {
        ...dto,
        quizId: new mongoose.Types.ObjectId(dto.quizId),
      };
      return await this.questionModel.create(question);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create question');
    }
  }



  async createMultipleQuestions(questions: (CreateQuestionDto & { quizId: string })[]) {
    try {
      for (const q of questions) {
        if (!this.isValidObjectId(q.quizId)) {
          throw new BadRequestException('One or more quizIds are invalid');
        }
      }
      const questionsWithObjectId = questions.map(q => ({
        ...q,
        quizId: new mongoose.Types.ObjectId(q.quizId),
      }));

      return await this.questionModel.insertMany(questionsWithObjectId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create multiple questions');
    }
  }



  async findByQuizId(quizId: string) {
    if (!this.isValidObjectId(quizId)) {
      throw new BadRequestException('Invalid quizId');
    }
    return this.find({
      filter: { quizId: new mongoose.Types.ObjectId(quizId) },
    });
  }




  async findById(quizId: string, questionId: string) {
    if (!this.isValidObjectId(quizId) || !this.isValidObjectId(questionId)) {
      throw new BadRequestException('Invalid quizId or questionId');
    }

    const question = await this.findOne({
      filter: {
        _id: new mongoose.Types.ObjectId(questionId),
        quizId: new mongoose.Types.ObjectId(quizId),
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found for this quiz');
    }

    return question;
  }




  async update(quizId: string, questionId: string, dto: UpdateQuestionDto) {
    if (!this.isValidObjectId(quizId) || !this.isValidObjectId(questionId)) {
      throw new BadRequestException('Invalid quizId or questionId');
    }

    const updated = await this.updateOne({
      filter: {
        _id: new mongoose.Types.ObjectId(questionId),
        quizId: new mongoose.Types.ObjectId(quizId),
      },
      update: dto,
    });

    if (!updated) {
      throw new NotFoundException('Question not found or not updated');
    }

    return updated;
  }


  

  async deleteQuestion(quizId: string, questionId: string) {
    if (!this.isValidObjectId(quizId) || !this.isValidObjectId(questionId)) {
      throw new BadRequestException('Invalid quizId or questionId');
    }

    const result = await this.deleteOne({
      _id: new mongoose.Types.ObjectId(questionId),
      quizId: new mongoose.Types.ObjectId(quizId),
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Question not found or already deleted');
    }

    return { message: 'Question deleted successfully' };
  }
}
