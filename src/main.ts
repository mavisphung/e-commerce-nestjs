import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import "reflect-metadata";
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./shared/error";
import { AuthGuard } from "./shared/auth/auth.guard";
import { RoleGuard } from "./shared/auth/role-auth.guard";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const host = configService.get("server.host", "localhost");
  const port = configService.get("server.port", 8080);

  //swagger api
  const apiOptions = new DocumentBuilder()
      .setTitle("E-commerce")
      .setDescription("This is a demo e-commercial app")
      .addBearerAuth() //add jwt authentication
      .build();

  const document = SwaggerModule.createDocument(app, apiOptions);
  SwaggerModule.setup('api', app, document);

  //validator
  app.useGlobalPipes(new ValidationPipe());

  //Exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  const reflector = app.get(Reflector);
  //setup global middlewares
  app.useGlobalGuards(
    // new JwtAuthGuard(),
    new AuthGuard(reflector),
    // new RoleGuard(),
  );

  await app.listen(port, host);
  console.log(`Application is running on ${await app.getUrl()}`);
}
bootstrap();
