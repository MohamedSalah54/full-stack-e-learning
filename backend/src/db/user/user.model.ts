import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { UserRoles } from 'src/common/enum';

export interface IImage {
  secure_url: string;
  public_id: string;
  folderId: string;
}

export interface IOtp {
  code: string;
  otpType: string;
  expiresIn: Date;
}

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  
  @Prop({ required: false, unique: true, match: /^[0-9]{8,15}$/ })
  phone?: string;

  @Prop({ required: true })
  password: string;
  @Prop({ required: true, enum: UserRoles, default: UserRoles.STUDENT })
  role: string;

  @Prop({ type: [String], default: [], required: false })
  skills?: string[];

  @Prop({ type: [String], default: [], required: false })
  qualifications?: string[];

  @Prop({ default: '' })
  bio?: string;

  @Prop({ type: { secure_url: String, public_id: String } })
  profilePicture?: IImage;

  @Prop({ default: false })
  isConfirmed: boolean;

  @Prop({
    type: [
      {
        code: { type: String },
        otpType: { type: String },
        expiresIn: { type: Date },
      },
    ],
  })
  otp: IOtp[];
  @Prop({
    type: {
      youtube: { type: String, default: '' },
      facebook: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      x: { type: String, default: '' },
    },
    default: {},
  })
  links?: {
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    x?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

export type TUser = HydratedDocument<User> & Document;

export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
