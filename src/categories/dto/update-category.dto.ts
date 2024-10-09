import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
