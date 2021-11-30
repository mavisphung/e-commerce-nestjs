import { JwtPayload, LoginPayload } from './auth.dto';
import { User } from './../user/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AppError, ERROR_CODE } from 'src/shared/error';
import { UserUtil } from '../user/user.util';
import { UserView } from '../user/user.dto';
import { Supplier } from '../supplier/supplier.entity';
import { RoleCode } from '../role/role.enum';
import { SupplierView } from '../supplier/supplier.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  getUserService() {
    return this.userService;
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    // const user: any = {};
    if (!user) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    const compareResult = await UserUtil.validatePassword(pass, user.password);
    // const compareResult = await compare(pass, user.password);
    if (!compareResult) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }
    // const { password, ...result } = user;
    return user as User;
  }

  async login(user: LoginPayload) {
    const userData = await this.validateUser(user.email, user.password);
    if (!userData) {
      throw new UnauthorizedException();
    }
    let view;
    if (userData.role.code === RoleCode.SUPPLIER) {
      view = UserUtil.getUserViewByUser(userData) as UserView;
    }
    
    
    const payload: JwtPayload = {
      userId: userData.id,
      userInfo: view,
    }
    
    const token = this.jwtService.sign(payload);

    return {
      token,
      userInfo: view
    }
  }
}
