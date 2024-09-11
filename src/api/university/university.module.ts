import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { PrismaService } from 'src/services';

@Module({
  providers: [UniversityService, PrismaService],
  controllers: [UniversityController]
})
export class UniversityModule { }
