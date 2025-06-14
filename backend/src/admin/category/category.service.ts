import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoryRepo } from '../../db/category/category.repo';
import { TCategory } from '../../db/category/category.model';
import { Types } from 'mongoose';

interface CreateCategory {
  name: string;
  description?: string;
}

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  async create(data: CreateCategory): Promise<TCategory> {
    try {
      const category = await this.categoryRepo.create(data);
      return category;
    } catch (error) {
      throw new BadRequestException('Failed to create category. Please check your input.');
    }
  }

  async find() {
    try {
      const categories = await this.categoryRepo.find();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching categories.')
    }
  }

  async findOne(id: Types.ObjectId) {
    try {
      const category = await this.categoryRepo.findOne({ filter: { _id: id } });
      if (!category) throw new NotFoundException('Category not found.')
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Invalid ID or error occurred while retrieving the category.')
    }
  }

  async updateOne(id: Types.ObjectId, updateData: { name: string; description?: string }) {
    try {
      const updatedCategory = await this.categoryRepo.updateOne({ filter: { _id: id }, update: updateData });

      if (!updatedCategory) throw new NotFoundException('Cannot update a non-existing category.')
      return updatedCategory;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to update category. Please verify your data.')
    }
  }

  async deleteOne(id: Types.ObjectId) {
    try {
      const deleted = await this.categoryRepo.deleteOne(id);
      if (!deleted) throw new NotFoundException('Cannot delete a non-existing category.');
      return { message: 'Category deleted successfully.' }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to delete category.');
    }
  }
}
