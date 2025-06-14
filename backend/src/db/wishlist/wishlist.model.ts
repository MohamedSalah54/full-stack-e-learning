import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Course } from '../course/course.model';
import { User } from '../user/user.model';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Wishlist {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  courseId: Types.ObjectId;

  @Prop({ default: Date.now })
  addedAt: Date;
}

export const wishlistSchema = SchemaFactory.createForClass(Wishlist);

export type TWishlist = HydratedDocument<Wishlist> & Document;

export const WishlistModel = MongooseModule.forFeature([
  { name: Wishlist.name, schema: wishlistSchema },
]);
