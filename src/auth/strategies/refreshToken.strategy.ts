import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/user/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(private readonly usersService: UsersService,
    private readonly configService: ConfigService, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'), 
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
