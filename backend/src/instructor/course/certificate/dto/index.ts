import { ArrayNotEmpty, IsArray, IsDateString, IsMongoId, IsString, ValidateIf } from 'class-validator';

export class CreateCertificateDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  courseId: string;

  @IsDateString()
  issueDate: Date;

  @IsString()
  certificateUrl: string;

  @IsString()
  serialNumber: string;
}

export class UpdateCertificateDto {
  @ValidateIf(o => o.issueDate !== undefined)
  @IsDateString()
  issueDate?: string;

  @ValidateIf(o => o.certificateUrl !== undefined)
  @IsString()
  certificateUrl?: string;

  @ValidateIf(o => o.serialNumber !== undefined)
  @IsString()
  serialNumber?: string;
}

export class CreateBulkCertificateDto {
  @IsString()
  courseId: string;

  @IsArray()
  @ArrayNotEmpty()
  userIds: string[]

  @IsString()
  certificateUrl: string;

}

