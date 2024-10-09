import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/types/role.enum";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  async createCategory(@Body() createCategoryDto: any) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(":id")
  @Roles(Role.Admin, Role.Manager)
  async updateCategory(
    @Param("id") id: string,
    @Body() updateCategoryDto: any,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  async deleteCategory(@Param("id") id: string) {
    return this.categoriesService.delete(id);
  }

  @Get()
  @Roles(Role.Admin, Role.Manager, Role.Client)
  async getAllCategories() {
    return this.categoriesService.findAll();
  }
}
