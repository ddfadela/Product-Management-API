import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: "Product name is required" })
  @MaxLength(100, {
    message: "Product name can be at most 100 characters long",
  })
  @ApiProperty({
    description: "The name of the product",
    example: "Product 1",
  })
  name: string;

  @IsString()
  @MaxLength(500, { message: "Description can be at most 500 characters long" })
  @ApiProperty({
    description: "The description of the product",
    example: "A high-quality product that meets all standards.",
  })
  description: string;

  @IsNumber()
  @Min(0, { message: "Price must be a positive number" })
  @ApiProperty({
    description: "The price of the product",
    example: 100,
  })
  price: number;

  @IsNumber()
  @Min(0, { message: "Stock quantity must be a positive number" })
  @ApiProperty({
    description: "The stockQuantity of the product",
    example: 100,
  })
  stockQuantity: number;

  @IsString()
  @IsNotEmpty({ message: "Category is required" })
  @ApiProperty({
    description: "The category of the product",
    example: "category1",
  })
  category: string;
}
