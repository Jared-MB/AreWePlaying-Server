import { Module } from '@nestjs/common';
import { UniversitiesModule } from './api/universities/universities.module';
import { TeamsModule } from './api/teams/teams.module';
import { MatchesModule } from './api/matches/matches.module';
import { AuthModule } from './api/auth/auth.module';


@Module({
  imports: [
    UniversitiesModule,
    TeamsModule,
    MatchesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
