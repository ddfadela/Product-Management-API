import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @IsNotEmpty({ message: "Password is required" })
  readonly password: string;

  @IsString()
  @IsIn(["Admin", "Manager", "Client"], {
    message: "Role must be either Admin, Manager, or Client",
  })
  @IsNotEmpty({ message: "Role is required" })
  readonly role: string;
}
