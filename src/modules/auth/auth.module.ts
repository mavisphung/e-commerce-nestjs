import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt"
    }),
    // JwtModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const jwtOptions = {
          secret: configService.get('JWT_SECRET', 'abc'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') || '1d' },
        }
        // console.log("Jwt Config: ", jwtOptions);
        return jwtOptions;
      },
      inject: [ConfigService],
    }),
    // JwtModule.register({
    //   secret: "do#may@biet*do",
    //   signOptions: {
    //     expiresIn: "1d"
    //   }
    // }),
    UserModule,
    RoleModule
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    // JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
