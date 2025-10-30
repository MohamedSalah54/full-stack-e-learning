import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UserRoles } from 'src/common/enum';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ConfirmEmailDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class ForgetPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsAlphanumeric()
  newPassword: string;
}

export class UpdateUserLinksDto {
  @IsOptional()
  @IsUrl({}, { message: 'Invalid YouTube URL' })
  youtube?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid Facebook URL' })
  facebook?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid LinkedIn URL' })
  linkedin?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid X (Twitter) URL' })
  x?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{8,15}$/)
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  qualifications?: string[];

  @IsOptional()
  @IsObject()
  profilePicture?: {
    secure_url: string;
    public_id: string;
  };
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserLinksDto)
  links?: UpdateUserLinksDto;

  @IsOptional()
  @IsString()
  currentPass?: string;

  @IsOptional()
  @IsString()
  newPass?: string;

  @IsOptional()
  @IsString()
  confirmPass?: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
  newPassword: string;

  @IsString()
  confirmNewPassword: string;
}
