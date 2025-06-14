import { IsArray, IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsMongoId()
  questionId: string;

  @IsNotEmpty()
  answer: string;
}

export class CreateQuizSubmissionDto {
  @IsMongoId()
  quizId: string;

  @IsMongoId()
  studentId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
