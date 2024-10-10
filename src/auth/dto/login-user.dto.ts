import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "The email of the user",
    example: "user@example.com",
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "The password of the user",
    example: "12345678",
  })
  readonly password: string;
}
