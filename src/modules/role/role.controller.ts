import { ISingleRes, IListRes } from './../../shared/response/index';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/public.decorator';
import { RoleDto } from './role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { Response } from 'express';

@ApiTags("roles")
@Controller('roles')
export class RoleController {

  constructor(
    private readonly roleService: RoleService
  ) {}

  @Post()
  // @Public()
  
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

  @Public()
  @Get()
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
