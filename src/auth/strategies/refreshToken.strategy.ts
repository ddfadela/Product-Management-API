import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/user/users.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_ACCESS_SECRET ||
        "daae18d60f129cab573d867faf07aab89e29fe912fb995567ae095831ebb50debcc590c4d82869fa2fe7a10d30b61727230d40e0f305b9f7307c42f4b404b39f",
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.get("Authorization").replace("Bearer", "").trim();

    const user = await this.usersService.findByEmail(payload.email);
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      throw new UnauthorizedException("Refresh token is invalid or expired.");
    }

    return { ...payload, refreshToken };
  }
}
