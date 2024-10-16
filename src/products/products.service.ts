import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.entity";
import { FilterProductsDto } from "./dto/filter-products.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productModel.findOne({
      name: createProductDto.name,
    });

    if (existingProduct) {
      throw new BadRequestException("Product with this name already exists.");
    }

    const createdProduct = new this.productModel(createProductDto);

    try {
      return await createdProduct.save();
    } catch (error) {
      console.error("Error creating product:", error);
      throw new InternalServerErrorException(
        "Error creating product. Please try again later.",
      );
    }
  }

  async getAllProducts(
    filterProductsDto: FilterProductsDto,
  ): Promise<{ products: Product[]; total: number }> {
    const { filters, page = 1, limit = 10 } = filterProductsDto;
    const { category, minPrice, maxPrice } = filters || {};

    const filter: any = { deleted: false }; 

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
    const products = await this.productModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    return { products, total };
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {

    const product = await this.productModel.findOne({
      name: updateProductDto.name,
    });

    if (!product) {
      throw new NotFoundException("This product does not exist");
    }

    if (product.deleted) {
      throw new BadRequestException("Product is already deleted.");
    }

    return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  async deleteProduct(id: string): Promise<string> {
    const existingProduct = await this.productModel.findOne({
      _id: id,
    });

    if (existingProduct) {
      throw new NotFoundException("Product with this id not found.");
    }

    if (existingProduct.deleted) {
      throw new BadRequestException("Product is already deleted.");
    }

    await this.productModel
      .findByIdAndUpdate(id, { deleted: true }, { new: true })
      .exec();

    return `Product with id ${id} deleted successfully`;
  }
}
