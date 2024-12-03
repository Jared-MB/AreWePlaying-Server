import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Patch,
  Post,
} from '@nestjs/common';
import { NotificationDto } from '../dtos/notification.dto';
import { NotificationRepository } from '../repositories/notification.repository';
import { UserService } from 'src/api/users/user.service';
import { AuthService } from 'src/api/auth/services/auth.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private notificationRepository: NotificationRepository,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  private async getUser(authorization: string) {
    const token = authorization.split(' ')[1];
    const payload = await this.authService.validateToken(token);
    const user = await this.userService.findOneByUsername(payload.username);
    return user;
  }

  @Get()
  async getAll(@Headers('authorization') authorization: string) {
    const user = await this.getUser(authorization);
    return await this.notificationRepository.getByUserId(user.id);
  }

  @Post()
  async create(
    @Body() notification: Pick<NotificationDto, 'matchId'>,
    @Headers('authorization') authorization: string,
  ) {
    const user = await this.getUser(authorization);
    return await this.notificationRepository.create({
      ...notification,
      userId: user.id,
      isActive: true,
    });
  }

  @Patch()
  async update(
    @Body() notification: Partial<NotificationDto>,
    @Headers('authorization') authorization: string,
  ) {
    const user = await this.getUser(authorization);
    return await this.notificationRepository.update({
      ...notification,
      userId: user.id,
    });
  }

  @Delete()
  async remove(
    @Body() notification: Omit<NotificationDto, 'userId'>,
    @Headers('authorization') authorization: string,
  ) {
    const user = await this.getUser(authorization);
    return await this.notificationRepository.remove(
      notification.matchId,
      user.id,
      notification.id,
    );
  }
}
