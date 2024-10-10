import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Role } from "src/common/types/role.enum";

export class UpdateRoleDto {
  @IsEnum(Role)
  @ApiProperty({
    description: "The role",
    enum: Role,
  })
  role: Role;
}
