import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from '../user/user.model';
import { Course } from '../course/course.model';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Enrollment {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Course.name, required: true })
  courseId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  enrolledAt: Date;

  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  progress: number;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop()
  certificateUrl?: string;
}

export const enrollmentSchema = SchemaFactory.createForClass(Enrollment);

export type TEnrollment = HydratedDocument<Enrollment> & Document;

export const EnrollmentModel = MongooseModule.forFeature([
  { name: Enrollment.name, schema: enrollmentSchema },
]);
