import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/user/users.module";
import { PassportModule } from "@nestjs/passport";
import { AccessTokenStrategy } from "./strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        "daae18d60f129cab573d867faf07aab89e29fe912fb995567ae095831ebb50debcc590c4d82869fa2fe7a10d30b61727230d40e0f305b9f7307c42f4b404b39f",
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
