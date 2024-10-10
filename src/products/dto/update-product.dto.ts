import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  MaxLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: "Product name can be at most 100 characters long",
  })
  @ApiProperty({
    description: "The name of the product",
    example: "Updated Product Name",
    maxLength: 100,
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: "Description can be at most 500 characters long" })
  @ApiProperty({
    description: "A description of the product",
    example: "This is an updated description for the product.",
    maxLength: 500,
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: "Price must be a positive number" })
  @ApiProperty({
    description: "The price of the product",
    example: 150.0,
    minimum: 0,
    required: false,
  })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: "Stock quantity must be a positive number" })
  @ApiProperty({
    description: "The stock quantity of the product",
    example: 20,
    minimum: 0,
    required: false,
  })
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "The category of the product",
    example: "Electronics",
    required: false,
  })
  category?: string;
}
