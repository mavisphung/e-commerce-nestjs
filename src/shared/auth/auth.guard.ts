import { ERROR_CODE } from 'src/shared/error';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { AppError } from "../error";
import { Reflector } from '@nestjs/core';




@Injectable()
export class AuthGuard implements CanActivate {

  private jwtService: JwtService;

  constructor(private readonly reflector: Reflector) {
    const options: JwtModuleOptions = {
      secret: process.env.JWT_SECRET
    }
    this.jwtService = new JwtService(options);
  }


  canActivate(context: ExecutionContext): boolean {
    console.log("AuthGuard.canActivate(content) invoked");

    //----------------------GET ROLES----------------------
    // determine who is allowed to continue, base on role code
    // get role codes from decorator of controller method
    const allowedRoles = this.reflector.get<string[]>("roleCodes", context.getHandler());
    console.log("RoleCodes: ", allowedRoles);

    // nothing means public
    if (!allowedRoles || !allowedRoles.length) {
      console.log("Not authorized yet");
      return true;
    }
    

    const request = context.switchToHttp().getRequest();

    //if there is no authorization in header, refuse the request
    if (!request.headers.authorization) throw new AppError(ERROR_CODE.UNAUTHORIZED, "Invalid user");
    
    // console.log("Token here", request.headers);
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = this.jwtService.decode(token) as {
      [key: string]: any
    };
    console.log("decoded here", decodedToken);

    const roleInToken = decodedToken.userInfo.role;
    console.log("Get role in token: ", roleInToken);
    const isMatched = allowedRoles.includes(roleInToken.code);

    request.user = decodedToken;

    return isMatched;
  }

  // Use for many role
  private matchRoles(allowedRoles: string[], rolesInToken: string[]): boolean {
    const matches = allowedRoles.filter(role => rolesInToken.includes(role));
    return matches.length > 0;
  }


}