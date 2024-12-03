import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchtDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Public } from 'src/decorators';

@Public()
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchService: MatchesService) {}

  @Post()
  createMatch(@Body() createMatchDto: CreateMatchtDto) {
    return this.matchService.createMatch(createMatchDto);
  }

  @Get()
  findAll(
    @Query() query: { deporte?: string; fecha?: string; categoria?: string },
  ) {
    const date = query.fecha ? JSON.parse(query.fecha) : undefined;

    const sport = isNaN(Number(query.deporte))
      ? undefined
      : Number(query.deporte);

    return this.matchService.getMatches({
      date,
      sport,
      category: query.categoria,
    });
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
