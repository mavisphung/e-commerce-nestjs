import { RoleService } from './../role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { RoleModule } from '../role/role.module';
import { Role } from '../role/role.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule
  ],
  providers: [
    UserService,
    ConfigService,
    RoleService,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    // because this project uses built-in repository of TypeOrmModule,
    // it would better to export TypeOrmModule after register repository for entity
    TypeOrmModule 
  ]
})
export class UserModule {}
