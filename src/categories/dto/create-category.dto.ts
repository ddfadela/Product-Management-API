import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "Category name is required" })
  @ApiProperty({
    description: "The name of the category",
    example: "electronics",
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The description of the category",
    example: "",
    required: false,
  })
  readonly description?: string;
}
