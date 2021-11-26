import { Role } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role])
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService, TypeOrmModule]
})
export class RoleModule {}
