import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index';

// @UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  // @Get()
  // async getAllCategories() {
  //   return this.categoryService.find();
  // }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    const categoryId = new Types.ObjectId(id);
    return this.categoryService.findOne(categoryId);
  }

  @Get()
  async getCategories(
    @Query('search') search?: string,
    @Query('parentCategory') parentCategory?: string,
  ) {
    if (search || parentCategory) {
      return this.categoryService.findFiltered(search, parentCategory);
    }
    return this.categoryService.find();
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    const categoryId = new Types.ObjectId(id);
    return this.categoryService.updateOne(categoryId, body);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    const categoryId = new Types.ObjectId(id);
    return this.categoryService.deleteOne(categoryId);
  }

  @Get(':id/stats')
  getCategoryStats(@Param('id') id: string) {
    return this.categoryService.getCategoryStats(id);
  }
}
