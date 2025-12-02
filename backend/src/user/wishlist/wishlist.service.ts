import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WishlistRepo } from 'src/db/wishlist/wishlist.repo';
import { CreateWishlistDto } from './dto';
import { Types } from 'mongoose';

@Injectable()
export class WishlistService {
  constructor(private readonly wishlistRepo: WishlistRepo) {}

  async addCourse(dto: CreateWishlistDto) {
    const userId = new Types.ObjectId(dto.userId);
    const courseId = new Types.ObjectId(dto.courseId);

    const existingWishlist = await this.wishlistRepo.findOne({
      filter: { userId, courseId },
    });
    if (existingWishlist) {
      throw new BadRequestException('Course already exists in wishlist');
    }

    try {
      return await this.wishlistRepo.create({
        userId,
        courseId,
        addedAt: new Date(),
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to add course to wishlist');
    }
  }

  async getWishlist(userId: string) {
    try {
      const wishlist = await this.wishlistRepo.find({
        filter: { userId: new Types.ObjectId(userId) },
        populate: [
          {
            path: 'courseId',
            select:
              'title description thumbnail price rating reviews lessons students',
          },
        ],
      });
      return wishlist;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to fetch wishlist');
    }
  }

  async removeCourse(userId: string, courseId: string) {
    const result = await this.wishlistRepo.deleteOne({
      userId: new Types.ObjectId(userId),
      courseId: new Types.ObjectId(courseId),
    });

    if (!result || result.deletedCount === 0) {
      throw new NotFoundException('Wishlist item not found');
    }

    return true;
  }

  async clearWishlist(userId: string) {
    try {
      const result = await this.wishlistRepo.delete({
        userId: new Types.ObjectId(userId),
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to clear wishlist');
    }
  }
}
