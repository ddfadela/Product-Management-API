import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./category.entity";
import { Model } from "mongoose";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (existingCategory) {
      throw new BadRequestException("Category with this name already exists.");
    }
    const newCategory = new this.categoryModel(createCategoryDto);
    return await newCategory.save();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryModel.findOne({
      name: updateCategoryDto.name,
    });

    if (!category) {
      throw new NotFoundException("This category does not exist");
    }

    if (category.deleted) {
      throw new BadRequestException("Category is already deleted.");
    }
    
    return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<string> {
    const existingCategory = await this.categoryModel.findOne({
      __id: id,
    });

    if (existingCategory) {
      throw new NotFoundException("Category with this id not found.");
    }
    if (existingCategory.deleted ){
      throw new BadRequestException("Category is already deleted.");
    }

    await this.categoryModel
      .findByIdAndUpdate(id, { deleted: true }, { new: true })
      .exec();

    return `Category with id ${id} deleted successfully`;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find({deleted:false}).exec();
  }
}
