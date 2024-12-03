import {
  Controller,
  Get,
  Headers,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './api/auth/services/auth.service';
import { LocalAuthGuard } from './api/auth/guards/local-auth.guard';
import { JwtAuthGuard } from './api/auth/guards/jwt-auth.guard';
import { Public } from './decorators';
import { UserService } from './api/users/user.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    const user = await this.authService.validateToken(token);
    return this.userService.findOneByUsername(user.username);
  }

  @Public()
  @Get('health-check')
  healthCheck(@Res() res: Response) {
    return res.json({
      status: 'ok',
    });
  }
}
