import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserEntity } from "./user.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { RefreshTokenGuard } from "src/common/guards/refreshToken.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("auth")
@ApiBearerAuth()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  @ApiOperation({ summary: "Sign up a user" })
  @ApiBody({
    description: "Create a new user with email and password",
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.authService.register({ ...createUserDto });
  }

  @Post("login")
  @ApiOperation({ summary: "Log in a user" })
  @ApiBody({
    description: "Login with email and password",
    type: LoginUserDto,
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return await this.authService.login({ ...loginUserDto });
  }

  @UseGuards(AccessTokenGuard)
  @Post("logout")
  @ApiOperation({ summary: "Log out a user" })
  @ApiBody({
    description: "Log out by providing email and refresh token",
    schema: {
      example: {
        email: "user@example.com",
        refreshToken: "jwt_refresh_token",
      },
    },
  })
  async logout(@Body() body: { email: string; refreshToken: string }) {
    const { email, refreshToken } = body;
    return await this.authService.logout(email, refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token for a user" })
  @ApiBody({
    description: "Refresh access token using email and refresh token",
    schema: {
      example: {
        email: "user@example.com",
        refreshToken: "jwt_refresh_token",
      },
    },
  })
  async refresh(@Body() body: { email: string; refreshToken: string }) {
    const { email, refreshToken } = body;
    return await this.authService.refreshAccessToken(email, refreshToken);
  }
}
