import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "src/common/types/jwt.type";
import { UsersService } from "src/user/users.service";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_ACCESS_SECRET ||
        "daae18d60f129cab573d867faf07aab89e29fe912fb995567ae095831ebb50debcc590c4d82869fa2fe7a10d30b61727230d40e0f305b9f7307c42f4b404b39f",
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
