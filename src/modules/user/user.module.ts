import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    ConfigService
  ],
  controllers: [UserController],
  exports: [
    UserService,
    TypeOrmModule
  ]
})
export class UserModule {}
