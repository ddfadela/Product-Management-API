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
  name: string;

  @IsString()
  @MaxLength(500, { message: "Description can be at most 500 characters long" })
  description: string;

  @IsNumber()
  @Min(0, { message: "Price must be a positive number" })
  price: number;

  @IsNumber()
  @Min(0, { message: "Stock quantity must be a positive number" })
  stockQuantity: number;

  @IsString()
  @IsNotEmpty({ message: "Category is required" })
  category: string;
}
