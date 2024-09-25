import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaService } from 'src/services';

@Module({
  providers: [MatchesService, PrismaService],
  controllers: [MatchesController],
})
export class MatchesModule {}
