import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateEnrollmentDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  courseId: string;
}

export class ManualEnrollmentDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  courseId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

export class UpdateEnrollmentProgressDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
