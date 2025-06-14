import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Quiz } from '../quiz/quiz.model';

export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER', 
}

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Question {
  @Prop({ type: Types.ObjectId, ref: Quiz.name, required: true })
  quizId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  questionText: string;

  @Prop({ required: true, enum: QuestionType })
  type: QuestionType;

  @Prop({ type: [String], default: [] })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop()
  explanation: string;

  @Prop({ required: true })
  marks: number;
}

export const questionSchema = SchemaFactory.createForClass(Question);

export type TQuestion = HydratedDocument<Question> & Document;

export const QuestionModel = MongooseModule.forFeature([
  { name: Question.name, schema: questionSchema },
]);
