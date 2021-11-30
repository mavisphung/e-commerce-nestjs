import { SupplierService } from './../supplier/supplier.service';
import { DeleteResult } from 'typeorm';
import { RoleCode } from './../role/role.enum';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Res, UseGuards, HttpStatus, Req, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDto, ProductInputDto } from './product.dto';
import { AllowedRole } from 'src/shared/role.decorator';
import { Request, Response } from 'express';
import { IListRes, ISingleRes } from 'src/shared/response';
import { User } from '../user/user.entity';
import { ICurrentUser } from '../user/user.dto';

@Controller('product')
@ApiBearerAuth()
export class ProductController {

  constructor(
    private readonly productService: ProductService,
    private readonly supplierService: SupplierService
  ) {}

  @ApiTags("products")
  @ApiOperation({
    summary: "Get all products"
  })
  // @UseGuards(JwtAuthGuard)
  // @AllowedRole(RoleCode.ADMIN, RoleCode.SUPPLIER)
  @Get("/customer")
  public async getProducts() {
    const products = await this.productService.findAll();

    const resData: IListRes<Product> = {
      success: (!products || !products.length) ? false : true,
      data: products,
      total: products.length
    }
    return resData;
  }

  @ApiTags("products-supplier")
  @ApiOperation({
    summary: "Create a product"
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRole(RoleCode.SUPPLIER)
  @Post()
  async createProduct(
    @Body() dto: ProductDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const currentUser = req.user as ICurrentUser;
    const supplierId = await this.supplierService.getExternalId(currentUser.userInfo.email);
    const productInput: ProductInputDto = {
      supplierId: supplierId, //Because of 2 different tables of users and suppliers, care of persistence
      productDto: dto
    }
    const savedProduct = await this.productService.create(productInput);
    
    const resData: ISingleRes<Product> = {
      success: savedProduct ? true : false,
      data: savedProduct
    }
    return res.status(HttpStatus.OK).send(resData);
  }

  @Delete()
  async removeAll(
    @Res() res: Response
  ) {
    const deleteResult = await this.productService.deleteAll();

    const resData: ISingleRes<DeleteResult> = {
      success: deleteResult ? true : false,
      data: deleteResult
    }

    return res.status(HttpStatus.OK).send(resData);
  }

  @ApiTags("products-supplier")
  @ApiOperation({
    summary: "Remove all products of a supplier"
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRole(RoleCode.SUPPLIER)
  @Delete("/supplier")
  async removeProductsBySupplier(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const currentUser = req.user as ICurrentUser;
    const result = await this.productService.removeBySupplier(currentUser.userInfo.email);

    const resData: ISingleRes<DeleteResult> = {
      success: result ? true : false,
      data: result
    }

    return res.status(HttpStatus.OK).send(resData);
  }

  @ApiTags("products-supplier")
  @ApiOperation({
    summary: "Get all products of a supplier"
  })
  @Get("/supplier/:id")
  async getProductsBySupplier(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: string
  ) {
    // const currentUser = req.user as ICurrentUser;
    const result = await this.productService.getProductsBySupplierId(id);

    const resData: ISingleRes<Product[]> = {
      success: result ? true : false,
      data: result
    }

    return res.status(HttpStatus.OK).send(resData);
  }
}
