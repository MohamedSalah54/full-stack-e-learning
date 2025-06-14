import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDateString,
    IsBoolean,
    IsMongoId,
    IsNumber,
    Min,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateAssignmentDto {
    @IsMongoId()
    @IsNotEmpty()
    lessonId: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    deadline: Date;

    @IsNumber()
    @Min(0)
    maxMarks: number;

    @IsBoolean()
    @IsOptional()
    fileUploadAllowed?: boolean;
}

export class UpdateAssignmentDto {
    @IsMongoId()
    @IsOptional()
    lessonId?: Types.ObjectId;

    @IsString()
   @IsOptional()
    title?: string;

    @IsString()
   @IsOptional()
    description?: string;

    @IsDateString()
    @IsOptional()
    deadline?: Date;

    @IsNumber()
    @Min(0)
    @IsOptional()
    maxMarks?: number;

    @IsBoolean()
    @IsOptional()
    fileUploadAllowed?: boolean;
}
