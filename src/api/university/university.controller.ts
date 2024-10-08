// university.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { Public } from 'src/decorators';

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.createUniversity(createUniversityDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.universityService.getUniversities();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universityService.getUniversityById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUniversityDto: UpdateUniversityDto,
  ) {
    return this.universityService.updateUniversity(+id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universityService.deleteUniversity(+id);
  }
}
