import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ProductsService } from './products.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { Product } from './product.entity';
import { FilterProductsDto } from './dto/filter-products.dto';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  async createProduct(@Body() createProductDto: any) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Manager, Role.Client)
  async getAllProducts(@Query() filterProductsDto: FilterProductsDto) {
    const { products, total } = await this.productService.getAllProducts(filterProductsDto);

    return {
      totalItems: total,
      products,
    };
  }
  @Put(':id')
  @Roles(Role.Admin, Role.Manager)
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

}
