import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, Max } from "class-validator";
import { UserStatus } from "./user.enum";

export class UserDto {

  @ApiProperty({ example: "abc@gmail.com"})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "123456" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "0349797318" })
  @IsNotEmpty()
  @Length(10) //min 10
  phoneNumber: string;

  @ApiProperty({ example: "Huy" })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: "Phung" })
  @IsNotEmpty()
  lastName: string;
}

export interface UserView {
  readonly email: string,
  readonly phoneNumber: string,
  readonly firstName: string,
  readonly lastName: string,
  readonly status: UserStatus,
  readonly password?: string,
}

export interface IUpdateUserView {
  readonly id: number;
  readonly userDto: UserDto;
}

export class UpdateUserModel {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly password: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly phoneNumber: string,
  ) {}
}