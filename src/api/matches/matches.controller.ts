import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchtDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchService: MatchesService) {}

  @Post()
  createMatch(@Body() createMatchDto: CreateMatchtDto) {
    return this.matchService.createMatch(createMatchDto);
  }

  @Get()
  findAll() {
    return this.matchService.getMatches();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.updateMatch(+id, updateMatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }
}
