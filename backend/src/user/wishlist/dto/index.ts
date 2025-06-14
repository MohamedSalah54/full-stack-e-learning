import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  courseId: string;
}

export class UpdateWishlistDto {
  @IsMongoId()
  userId?: string;

  @IsMongoId()
  courseId?: string;
}
