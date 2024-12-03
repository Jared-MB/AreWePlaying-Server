import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { NotificationRepository } from './repositories/notification.repository';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/services';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [UsersModule, AuthModule, MatchesModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, PrismaService],
})
export class NotificationsModule {}
