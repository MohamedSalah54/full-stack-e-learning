import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Lesson } from '../lesson/lesson.model';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Assignment {
  @Prop({ type: Types.ObjectId, ref: Lesson.name, required: true })
  lessonId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ required: true, min: 0 })
  maxMarks: number;

  @Prop({ default: false })
  fileUploadAllowed: boolean;
}

export const assignmentSchema = SchemaFactory.createForClass(Assignment);

export type TAssignment = HydratedDocument<Assignment> & Document;

export const AssignmentModel = MongooseModule.forFeature([
  { name: Assignment.name, schema: assignmentSchema },
]);
