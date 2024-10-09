import { IsOptional, IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FilterOptions {
  @IsOptional()
  @IsString()
  readonly category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly maxPrice?: number;
}


export class FilterProductsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterOptions)
  readonly filters?: FilterOptions;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly limit?: number;
}
