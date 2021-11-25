import { ERROR_CODE } from 'src/shared/error';
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { AppError } from "../error";
import { Reflector } from '@nestjs/core';





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

    // determine which route is public
    const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());

    if(isPublic) {
      console.log("Log in so that bypass AuthGuard middleware");
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
    // console.log("decoded here", decodedToken);

    request.user = decodedToken;
    return true;
  }
}