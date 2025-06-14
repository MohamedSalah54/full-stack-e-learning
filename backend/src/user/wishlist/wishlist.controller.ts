import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistDto } from "./dto";

@Controller("wishlist")
export class WishlistController{
  constructor(private readonly wishlistService: WishlistService) {}


  @Post()
  async addCourse(@Body() dto: CreateWishlistDto) {
    const wishlist = await this.wishlistService.addCourse(dto);
    return {
      message: 'Course added to wishlist successfully',
      statusCode: 201,
      data: wishlist,
    };
  }

   @Get(':userId')
  async getWishlist(@Param('userId') userId: string) {
    const wishlist = await this.wishlistService.getWishlist(userId);
    return {
      message: 'Wishlist fetched successfully',
      statusCode: 200,
      data: wishlist,
    };
  }

   @Delete(':userId/course/:courseId')
  async removeCourse(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    const result = await this.wishlistService.removeCourse(userId, courseId);
    if (!result) {
      throw new NotFoundException('Wishlist item not found');
    }
    return {
      message: 'Course removed from wishlist successfully',
      statusCode: 200,
    };
  }

  @Delete('/all/:userId')
  async clearWishlist(@Param('userId') userId: string) {
    const result = await this.wishlistService.clearWishlist(userId);
    return {
      message: 'Wishlist cleared successfully',
      statusCode: 200,
      data: result,
    };
  }
}