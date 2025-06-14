import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from '../user/user.model';
import { Course } from '../course/course.model';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Payment {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: ['paid', 'pending', 'failed'], default: 'pending' })
  status: string;

  @Prop({ required: true })
  paymentMethod: string; 

  @Prop()
  transactionId: string;
}

export const paymentSchema = SchemaFactory.createForClass(Payment);

export type TPayment = HydratedDocument<Payment> & Document;

export const PaymentModel = MongooseModule.forFeature([
  { name: Payment.name, schema: paymentSchema },
]);
