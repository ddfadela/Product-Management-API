import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.entity';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
      const newCategory = new this.categoryModel(createCategoryDto);
      return newCategory.save();
    }
  
    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
      return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    }
  
    async delete(id: string): Promise<any> {
      return this.categoryModel.findByIdAndDelete(id);
    }
  
    async findAll(): Promise<Category[]> {
      return this.categoryModel.find().exec();
    }
}
