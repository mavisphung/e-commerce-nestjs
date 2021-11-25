import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import config from './common/index';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        const options: TypeOrmModuleOptions = {
          type: "mysql",
          host: configService.get("db.host"),
          port: configService.get("db.port"),
          username: configService.get("db.user"),
          password: configService.get("db.password"),
          database: configService.get("db.name"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: false,
          logging: false
        }
        
        console.log("TypeOrmModule connected to db with option ", options);
        return options;
      }
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
