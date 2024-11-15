import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './api/auth/services/auth.service';
import { LocalAuthGuard } from './api/auth/guards/local-auth.guard';
import { JwtAuthGuard } from './api/auth/guards/jwt-auth.guard';
import { Public } from './decorators';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('health-check')
  healthCheck(@Res() res: Response) {
    return res.json({
      status: 'ok',
    });
  }
}
