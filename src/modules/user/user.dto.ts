import { Role } from './../role/role.entity';
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, Max } from "class-validator";
import { UserStatus } from "./user.enum";
import { RoleCode } from '../role/role.enum';
import { IRole, IRoleDto } from '../role/role.dto';

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

  @ApiProperty({
    required: true,
    example: `${RoleCode.SUPPLIER}`
  })
  // @ApiHideProperty()
  role: RoleCode;
}

export interface UserView {
  readonly email: string,
  readonly phoneNumber: string,
  readonly firstName: string,
  readonly lastName: string,
  readonly status: UserStatus,
  readonly password?: string,
  readonly role: IRole
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