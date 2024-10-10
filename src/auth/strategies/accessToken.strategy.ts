import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "src/common/types/jwt.type";
import { UsersService } from "src/user/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("JWT_ACCESS_SECRET"),
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.usersService.getUser({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
