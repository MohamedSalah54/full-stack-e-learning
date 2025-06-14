import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Quiz } from '../quiz/quiz.model';

@Schema({ timestamps: true, versionKey: false })
export class QuizSubmission {
  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quizId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true }) // الطالب
  studentId: Types.ObjectId;

  @Prop({
    type: [
      {
        questionId: { type: Types.ObjectId, required: true },
        answer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        marksObtained: { type: Number, required: true },
      },
    ],
    default: [],
  })
  answers: {
    questionId: Types.ObjectId;
    answer: string;
    isCorrect: boolean;
    marksObtained: number;
  }[];

  @Prop({ required: true })
  totalMarks: number;

  @Prop({ required: true })
  obtainedMarks: number;

  @Prop({ required: true })
  isPassed: boolean;
}

export const QuizSubmissionSchema = SchemaFactory.createForClass(QuizSubmission);

export type TQuizSubmission = HydratedDocument<QuizSubmission> & Document;
