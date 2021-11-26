import { UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcrypt";
import { UserView } from "./user.dto";
import { User } from "./user.entity";


export class UserUtil {
  static async hash(plain: string, salt: string | number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plain, 10, (err, hashed) => {
        if (err) return reject(err);
        return resolve(hashed);
      })
    })
  }

  static async validatePassword(plain: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plain, hashed, (err, same) => {
        if (err) return new UnauthorizedException();

        return resolve(same);
      }); 
    });
  }

  static getUserViewByUser(user: User): UserView {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      status: user.status,
      role: {
        id: user.role.id,
        code: user.role.code,
        name: user.role.name,
      }
    } as UserView;
  }
}