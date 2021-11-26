import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ISingleRes, IListRes } from './../../shared/response/index';
import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/public.decorator';
import { RoleDto } from './role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { Response } from 'express';
import { AllowedRole } from 'src/shared/role.decorator';
import { RoleCode } from './role.enum';
@ApiTags("roles")
@Controller('roles')
export class RoleController {

  constructor(
    private readonly roleService: RoleService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @AllowedRole(RoleCode.ADMIN)
  async process(
    @Body() role: RoleDto,
    @Res() res: Response
  ) {
    console.log(role);
    const savedRole = await this.roleService.create(role);
    const response: ISingleRes<RoleDto> = {
      success: true,
      data: savedRole
    }
    return res.status(HttpStatus.OK).send(response);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @AllowedRole(RoleCode.ADMIN)
  async getRoles(
    @Res() res: Response
  ) {
    const roles = await this.roleService.find();
    if (!roles || !roles.length) {
      return res.status(HttpStatus.OK).send({
        message: "No data"
      });
    }

    const response: IListRes<Role> = {
      success: true,
      data: roles
    }
    return res.status(HttpStatus.OK).send(response);
  }
}
