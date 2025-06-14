import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Assignment } from '../assignment/assignment.model';
import { User } from '../user/user.model';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class AssignmentSubmission {
  @Prop({ type: Types.ObjectId, ref: Assignment.name, required: true })
  assignmentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  studentId: Types.ObjectId;

  @Prop({ required: true })
  submittedAt: Date;

  @Prop({ required: true, trim: true })
  fileUrl: string;

  @Prop({ min: 0 })
  grade?: number;

  @Prop({ trim: true })
  feedback?: string;
}

export const assignmentSubmissionSchema = SchemaFactory.createForClass(AssignmentSubmission);

export type TassignmentSubmission = HydratedDocument<AssignmentSubmission> & Document;

export const SubmissionModel = [
  { name: AssignmentSubmission.name, schema: assignmentSubmissionSchema },
];
