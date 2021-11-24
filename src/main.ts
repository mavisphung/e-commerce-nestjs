import "reflect-metadata";
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./shared/error";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  const configService: ConfigService = app.get(ConfigService);
  const host = configService.get("server.host", "localhost");
  const port = configService.get("server.port", 8080);

  //swagger api
  const apiOptions = new DocumentBuilder()
      .setTitle("E-commerce")
      .setDescription("This is a demo e-commercial app")
      .build();

  const document = SwaggerModule.createDocument(app, apiOptions);
  SwaggerModule.setup('api', app, document);

  //validator
  app.useGlobalPipes(new ValidationPipe());

  //Exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);
  console.log(`Application is running on ${await app.getUrl()}`);
}
bootstrap();
