import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { Role } from "src/common/types/role.enum";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: "Email is required" })
  @ApiProperty({
    description: "The email of the user",
    example: "user@example.com",
  })
  email: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @IsNotEmpty({ message: "Password is required" })
  @ApiProperty({
    description: "The password of the user",
    example: "12345678",
    minimum: 6,
  })
  readonly password: string;

  @IsString()
  @IsIn(["Admin", "Manager", "Client"], {
    message: "Role must be either Admin, Manager, or Client",
  })
  @IsNotEmpty({ message: "Role is required" })
  @ApiProperty({
    description: "The role of the user",
    example: "Admin",
    enum: Role,
  })
  readonly role: string;
}
