import { RoleCode } from './../role/role.enum';
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty, Length } from "class-validator";
import { UserDto, UserView } from '../user/user.dto';

export class SupplierDto extends UserDto {

  @ApiProperty({ example: "supplier-x@gmail.com" })
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

  @ApiProperty({ example: "Supplier X" })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: "Phung" })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: "7/5 Aloseha Str." })
  @IsNotEmpty()
  address: string;
  
}

export interface SupplierView extends UserView {
  readonly supplierId: string;
}