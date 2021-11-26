import { AllowedRole } from './../../shared/role.decorator';
import { RoleCode } from './../role/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { SupplierDto } from './supplier.dto';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';
import { ISingleRes } from 'src/shared/response';

@Controller('supplier')
export class SupplierController {

  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiTags("suppliers")
  // @AllowedRole(RoleCode.ADMIN)
  async doSomething(
    @Body() dto: SupplierDto) {
    console.log(dto);
    const createdSupplier = await this.supplierService.createSupplier(dto);

    const response: ISingleRes<Supplier> = {
      success: true,
      data: createdSupplier
    }
    return createdSupplier;
  }
}
