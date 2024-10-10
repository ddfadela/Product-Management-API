import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/types/role.enum";
import { RolesGuard } from "src/common/guards/roles.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { UpdateRoleDto } from "./dto/update-role.dto";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(AccessTokenGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Create a new user" })
  async createUser(@Body() createUserDto: any) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Get all users" })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Put(":id/role")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Assign role to user" })
  @ApiBody({ type: UpdateRoleDto })
  async updateUserRole(
    @Param("id") id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.usersService.updateRole(id, updateRoleDto.role);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Delete user by ID" })
  async deleteUser(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
