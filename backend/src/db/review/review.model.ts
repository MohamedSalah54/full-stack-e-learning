import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from '../user/user.model';
import { Course } from '../course/course.model';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Review {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Course.name, required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

export const reviewSchema = SchemaFactory.createForClass(Review);
export type TReview = HydratedDocument<Review>;

export const RevieweModel = MongooseModule.forFeature([
  { name: Review.name, schema: reviewSchema },
]);