import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [UserModule, UniversityModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
