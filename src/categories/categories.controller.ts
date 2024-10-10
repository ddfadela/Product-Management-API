import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/types/role.enum";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { RolesGuard } from "src/common/guards/roles.guard";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("categories")
@ApiBearerAuth()
@Controller("categories")
@UseGuards(AccessTokenGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  @ApiOperation({ summary: "Create a new category" })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(":id")
  @Roles(Role.Admin, Role.Manager)
  @ApiOperation({ summary: "Update a category by ID" })
  async updateCategory(
    @Param("id") id: string,
    @Body() updateCategoryDto: any,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Delete a category by ID" })
  async deleteCategory(@Param("id") id: string) {
    return this.categoriesService.delete(id);
  }

  @Get()
  @Roles(Role.Admin, Role.Manager, Role.Client)
  @ApiOperation({ summary: "Get all categories" })
  async getAllCategories() {
    return this.categoriesService.findAll();
  }
}
