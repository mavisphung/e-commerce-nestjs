import { AllowedRole } from './../../shared/role.decorator';
import { RoleCode } from './../role/role.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { SupplierDto } from './supplier.dto';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';
import { IListRes, ISingleRes } from 'src/shared/response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { AppError, ERROR_CODE } from 'src/shared/error';

@Controller('supplier')
export class SupplierController {

  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiTags("admin-suppliers")
  @ApiOperation({
    summary: "Admin creates supplier"
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRole(RoleCode.ADMIN)
  async createSuppliers(
    @Body() dto: SupplierDto) {
    console.log(dto);
    const createdSupplier = await this.supplierService.createSupplier(dto);

    const response: ISingleRes<Supplier> = {
      success: true,
      data: createdSupplier
    }
    return createdSupplier;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @AllowedRole(RoleCode.ADMIN)
  @ApiTags("admin-suppliers")
  @ApiOperation({
    summary: "Admin gets all suppliers"
  })
  async getSuppliers(
    @Res() res: Response
  ) {
    const data = await this.supplierService.getSuppliers();
    const response: IListRes<Supplier> = {
      success: true,
      data: data,
      total: data.length
    }
    return res.status(HttpStatus.OK).send(response);
  }


  @UseGuards(JwtAuthGuard)
  @AllowedRole(RoleCode.ADMIN)
  @Get(":id")
  @ApiTags("admin-suppliers")
  @ApiOperation({
    summary: "Admin gets supplier by id"
  })
  async getSupplierById(
    @Param("id") id: number,
    @Res() res: Response
  ) {
    const found = await this.supplierService.getSupplierById(id);
    console.log(found);
    if (!found) throw new AppError(ERROR_CODE.USER_NOT_FOUND);

    const resData: ISingleRes<Supplier> = {
      success: true,
      data: found
    }

    return res.status(HttpStatus.OK).send(resData);
  }

  @Delete(":id")
  async removeSupplier(
    @Param("id") id: number
  ) {
    //remove both suppliers and users table

  }
}
