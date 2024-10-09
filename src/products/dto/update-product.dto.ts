import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  MaxLength,
} from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: "Product name can be at most 100 characters long",
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: "Description can be at most 500 characters long" })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: "Price must be a positive number" })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: "Stock quantity must be a positive number" })
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  category?: string;
}
