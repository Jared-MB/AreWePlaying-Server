import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { UniversityModule } from './api/university/university.module';
import { MatchesModule } from './api/matches/matches.module';
import { SportModule } from './api/sport/sport.module';
import { TeamsModule } from './api/teams/teams.module';
import { NotificationsModule } from './api/notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    UniversityModule,
    TeamsModule,
    MatchesModule,
    SportModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
