import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";
import { UserView } from "../user/user.dto";

export interface JwtPayload {
  readonly userId: number;
  //extend more...
  readonly userInfo: UserView;
}

export class LoginPayload {
  @ApiProperty({ example: "thisismygmail@gmail.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "123456" })
  @IsNotEmpty()
  password: string;
}