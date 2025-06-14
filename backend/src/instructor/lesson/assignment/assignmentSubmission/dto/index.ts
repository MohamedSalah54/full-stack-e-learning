import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsString()
  assignmentId: string;

  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  fileUrl: string;
}


