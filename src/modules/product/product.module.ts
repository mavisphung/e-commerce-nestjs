import { SupplierService } from './../supplier/supplier.service';
import { SupplierModule } from './../supplier/supplier.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    SupplierModule,
    UserModule,
    RoleModule
  ],
  providers: [
    ProductService,
    SupplierService,
    UserService,
    RoleService
  ],
  controllers: [ProductController],
  exports: [ProductService, TypeOrmModule]
})
export class ProductModule {}
