import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_SECRET", 'abc'),
      ignoreExpiration: false,
    });
  }

  //Override
  //run verify after user log in
  //if the app doesnot invoke this function
  //then the secret key is not the same
  //this is also a middleware of JwtAuthGuard
  async validate(payload: any) {
    console.log("JwtStrategy.validate(payload) run");
    // console.log(payload);
    return {...payload };
  }
}