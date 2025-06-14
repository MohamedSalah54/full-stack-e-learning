 import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from '../base.repo';
import { Review, TReview } from './review.model';

export class ReviewRepo extends BaseRepo<TReview> {
  constructor(
    @InjectModel(Review.name) private readonly review: Model<TReview>,
  ) {
    super(review);
  }
}