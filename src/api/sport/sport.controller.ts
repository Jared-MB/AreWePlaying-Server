import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SportService } from './sport.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Public } from 'src/decorators';

@Public()
@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Post()
  create(@Body() createSportDto: CreateSportDto) {
    return this.sportService.createSport(createSportDto);
  }

  @Get()
  findAll() {
    return this.sportService.getSports();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportService.getSportsById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSportDto: UpdateSportDto) {
    return this.sportService.updateSport(+id, updateSportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportService.deleteSport(+id);
  }
}
