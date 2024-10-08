import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaService } from 'src/services';

@Module({
  providers: [TeamsService, PrismaService],
  controllers: [TeamsController],
})
export class TeamsModule {}
