import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';

//middleware
export class RoleGuard implements CanActivate {

  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log("RoleGuard.canActivate(context): invoked\n", req.user);
    return true;
  }
}