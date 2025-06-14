import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from '../base.repo';
import { Model } from 'mongoose';
import { TWishlist, Wishlist } from './wishlist.model';

export class WishlistRepo extends BaseRepo<TWishlist> {
  constructor(
    @InjectModel(Wishlist.name) private readonly WishlistModel: Model<TWishlist>,
  ) {
    super(WishlistModel);
  }
}
