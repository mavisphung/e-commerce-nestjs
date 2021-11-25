import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Role } from "./role.entity";
import { RoleCode } from "./role.enum";


export class RoleDto {

  @ApiProperty({
    example: "ADMIN",
    required: true
  })
  name: string;

  @ApiProperty({
    example: `${RoleCode.ADMIN}`,
    required: true,
    enum: RoleCode,
    type: [RoleCode]
  })
  code: RoleCode;

  @ApiProperty({
    example: "A short description of ADMIN role",
    required: true
  })
  description: string;
}

export class RolesInput {
  readonly roles: Role[];
}