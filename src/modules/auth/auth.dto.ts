import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UserView } from "../user/user.dto";

export interface JwtPayload {
  readonly userId: number;
  //extend more...
  readonly userInfo: UserView;
  // readonly role: IRole
}

export interface IRole {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly description?: string;
}

export class LoginPayload {
  @ApiProperty({ example: "admin@gmail.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "123456" })
  @IsNotEmpty()
  password: string;
}