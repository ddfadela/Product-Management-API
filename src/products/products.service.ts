import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.entity';
import { FilterProductsDto } from './dto/filter-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async getAllProducts(filterProductsDto: FilterProductsDto): Promise<{ products: Product[], total: number }> {
    const { filters, page=1,limit=10 } = filterProductsDto;
    const { category, minPrice, maxPrice } = filters || {};
    
    const filter: any = {};

    // Filtering logic
    if (category) {
      filter.category = category;
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      filter.price = { $lte: maxPrice };
    }

    const skip = (page - 1) * limit;
    const total = await this.productModel.countDocuments(filter); 
    const products = await this.productModel.find(filter).skip(skip).limit(limit).exec();

    return { products, total };
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

}
