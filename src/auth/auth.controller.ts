import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser({email:loginUserDto.email,password:loginUserDto.password});
    if (!user) {
      throw new BadRequestException('User not found');
    }
   return await this.authService.login({...loginUserDto})
  }

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.authService.register({ ...createUserDto });
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Body() body: { email: string; refreshToken: string }) {
    const { email, refreshToken } = body;
    return await this.authService.logout(email, refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@Body() body: { email: string; refreshToken: string }) {
    return await this.authService.refreshAccessToken(body.email, body.refreshToken);
  }
}
