import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  
}