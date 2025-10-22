import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  parentCategory?: string;

  @IsOptional()
  @IsString()
  iconKey?: string; 
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
