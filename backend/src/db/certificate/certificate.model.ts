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
export class Certificate {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Course.name, required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  issueDate: Date;

  @Prop({ required: true })
  certificateUrl: string;

  @Prop({ required: true, unique: true })
  serialNumber: string;
}

export const certificateSchema = SchemaFactory.createForClass(Certificate);

export type TCertificate = HydratedDocument<Certificate> & Document;

export const CertificateModel = MongooseModule.forFeature([
  { name: Certificate.name, schema: certificateSchema },
]);
