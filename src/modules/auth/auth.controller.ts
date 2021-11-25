import { ISingleRes } from './../../shared/response/index';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Controller, Post, HttpStatus, Req, UseGuards, Body, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginPayload } from './auth.dto';
import { Public } from 'src/shared/public.decorator';


@ApiTags("authenticate")
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @Public()
  async authenticate(
    @Body() credential: LoginPayload,
    @Res() res: Response
  ) {
    const result = await this.authService.login(credential);
    return res.status(HttpStatus.OK).send(result);
  }
}
