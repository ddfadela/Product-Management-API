import {
  IsOptional,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
@ApiExtraModels()
class FilterOptions {
  @ApiProperty({
    description: "Filter by category",
    example: "electronics",
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly category?: string;

  @ApiProperty({
    description: "Minimum price filter",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minPrice?: number;

  @ApiProperty({
    description: "Maximum price filter",
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly maxPrice?: number;
}

export class FilterProductsDto {
  @ApiProperty({
    description: "Filter options for the products",
    type: FilterOptions,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterOptions)
  readonly filters?: FilterOptions;

  @ApiProperty({
    description: "Page number for pagination",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly page?: number;

  @ApiProperty({
    description: "Number of items per page",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly limit?: number;
}
