import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string; 
}
