import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { Public } from 'src/decorators';

@Public()
@Controller('matches')
export class MatchesController {
  @Get()
  getAllMatches() {
    return 'Se muestran los matches';
  }
  @Post()
  createMatch(@Body() _matchDto: any) {
    return 'match creado';
  }
  @Put(':id')
  updateMatch(@Param('id') id: string, @Body() _matchDto: any) {
    return `actualizando el id: ${id} `;
  }
}
