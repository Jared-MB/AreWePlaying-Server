import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { PrismaService } from 'src/services';

@Module({
  providers: [SportService, PrismaService],
  controllers: [SportController],
})
export class SportModule {}
