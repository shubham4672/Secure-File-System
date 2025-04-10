/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  RequestMapping,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './Auth.service';
import { CreateAuthDto, updateAuthDto } from './dto';
import { GetUser } from '../decorators/getUser.decorates';
import { GetUserId } from '../decorators/getUser.id.decorators';
import { AtGuards } from './guards/at.guard';
import { RolesGuard } from './guards/role.guard';
import { GetId } from './dto/auth.get.dto';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('admin/signup')
  signup(@Body() dto: CreateAuthDto) {
    return this.authService.adminsignup(dto);
  }

  @Post('customer/signup')
  Customersignup(@Body() dtouser: CreateAuthDto) {
    return this.authService.CustomerSignup(dtouser);
  }

  @Post('signin')
  signin(@Body() dto: CreateAuthDto) {
    return this.authService.signin(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @UseGuards(AtGuards, RolesGuard)
  @Get()
  getProfile(@GetUser() userId: number) {
    return this.authService.getProfile(userId['id']);
  }

  @Get('find')
  getUserIdByEmail(@Query() dtouser: GetId) {
    return this.authService.getUserIdByEmail(dtouser);
  }

  @UseGuards(AtGuards, RolesGuard)
  @Patch()
  editAccount(@GetUser() userId: number, @Body() dtouser: updateAuthDto) {
    console.log(userId);

    return this.authService.edit_costumer(userId['id'], dtouser);
  }

  @UseGuards(AtGuards, RolesGuard)
  @Delete()
  deletedAccount(@GetUserId() userId: number) {
    console.log(userId);

    return this.authService.deleteAccount(userId);
  }
}
