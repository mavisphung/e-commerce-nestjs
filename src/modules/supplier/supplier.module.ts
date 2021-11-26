import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier]),
    UserModule,
    RoleModule,
  ],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    UserService,
    RoleService
  ],
  exports: [ SupplierService, TypeOrmModule]
})
export class SupplierModule {}
