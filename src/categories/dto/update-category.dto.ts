import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The name of the category",
    example: "update category1",
    required: false,
  })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The description of the category",
    example: "",
    required: false,
  })
  readonly description?: string;
}
