import { Body, Controller, Post, Get, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post()
    @Roles(Role.Admin)
    async createUser(@Body() createUserDto: any) {
      return this.usersService.createUser(createUserDto);
    }
  
    @Get()
    @Roles(Role.Admin)
    async getAllUsers() {
      return this.usersService.findAll();
    }

    @Put(':id/role')
    @Roles(Role.Admin)
    async updateUserRole(@Param('id') id: string, @Body() updateRoleDto: { role: string }) {
      return this.usersService.updateRole(id, updateRoleDto.role);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    async deleteUser(@Param('id') id: string) {
      return this.usersService.delete(id);
    }
  
}