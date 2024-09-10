import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() loginDto: any) {
    return 'post loggin';
  }

  @Post('register')
  register(@Body() registerDto: any) {
    return 'post register';
  }

  @Get('user')
  getUser() {
    return 'Get user';
  }

  @Put('user')
  updateUser(@Body() userDto: any) {
    return 'Put user';
  }
}
