import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { RolesGuard } from "src/common/guards/roles.guard";
import { ProductsService } from "./products.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/types/role.enum";
import { FilterProductsDto } from "./dto/filter-products.dto";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@ApiTags("products")
@ApiBearerAuth()
@Controller("products")
@UseGuards(AccessTokenGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  @ApiOperation({ summary: "Create a new product" })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Manager, Role.Client)
  @ApiOperation({ summary: "Get all products" })
  @ApiQuery({
    name: "filters",
    required: false,
    type: String,
    description:
      'Filter options as a JSON string, e.g. {"category":"electronics","minPrice":0,"maxPrice":100}',
  })
  async getAllProducts(
    @Query("filters") filters: string,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
  ) {
    const parsedFilters = filters ? JSON.parse(filters) : {};
    const filterProductsDto: FilterProductsDto = {
      filters: parsedFilters,
      page,
      limit,
    };

    const { products, total } =
      await this.productService.getAllProducts(filterProductsDto);

    return {
      totalItems: total,
      products,
    };
  }

  @Put(":id")
  @Roles(Role.Admin, Role.Manager)
  @ApiOperation({ summary: "Update a product by ID" })
  async updateProduct(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Delete a product by ID" })
  async deleteProduct(@Param("id") id: string) {
    return this.productService.deleteProduct(id);
  }
}
