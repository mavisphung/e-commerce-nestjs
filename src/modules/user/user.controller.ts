import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto, UserView, IUpdateUserView } from './user.dto';
import { UserStatus } from './user.enum';
import { IListRes, ISingleRes } from 'src/shared/response';
import { User } from './user.entity';
import { UpdateResult } from 'typeorm';


@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard) //must be authenticated /user/**
export class UserController {

  constructor(private userService: UserService) {}

  @ApiTags("admin-users")
  @ApiOperation({
    summary: "Get users from database"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get all users from database"
  })
  @Get("/admin")
  async getAllUsers(@Res() res: Response) {
    const data = await this.userService.findAll();
    if (!data || !data[0]) return res.status(404).send({message: "No data"});

    const listRes: IListRes<UserView> = {
      success: true,
      data: data.map(user => {
        //return user detail except password
        const view: UserView = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          status: user.status,
        }
        return view;
      })
    }
    return res.status(HttpStatus.OK).send(listRes);
  }

  @ApiTags("admin-users")
  @ApiOperation({ summary: "Create a user" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Insert user into database"
  })
  @Post("/admin")
  async create(@Body() userDto: UserDto, @Res() res: Response) {
    const saved = await this.userService.create(userDto);

    const view: UserView = {
      email: saved.email,
      firstName: saved.firstName,
      lastName: saved.lastName,
      status: saved.status,
      phoneNumber: saved.phoneNumber,
      password: saved.password,
    }

    const result: ISingleRes<UserView> = {
      success: true,
      data: view
    }
    console.log(result);
    return res.status(201).send(result);
  }

  @ApiTags("admin-users")
  @ApiOperation({ summary: "Retrieve a specific user" })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: "Query a user in your database"
  })
  @Get("/admin/:id")
  async getUserById(@Param("id") id: number) {
    const found = await this.userService.findOne(+id);
    const singleRes: ISingleRes<User> = { 
      success: found ? true : false,
      data: found ? found : undefined
    }
    return singleRes;
  }

  @ApiTags("admin-users")
  @Patch("/admin/:id")
  async updateUserById(
    @Param("id") id: number,
    @Body() userDto: UserDto
  ) {
    const userView: IUpdateUserView = {
      id: id,
      userDto: userDto
    }
    const result = await this.userService.update(userView);
    const singleRes: ISingleRes<UpdateResult> = {
      success: true,
      data: result
    }
    return singleRes;
  }
}
