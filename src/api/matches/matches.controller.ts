import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';

@Controller('matches')
export class MatchesController {
  @Get()
  getAllMatches() {
    return 'Se muestran los matches';
  }
  @Post()
  createMatch(@Body() matchDto: any) {
    return 'match creado';
  }
  @Put(':id')
  updateMatch(@Param('id') id: string, @Body() matchDto: any) {
    return `actualizando el id: ${id} `;
  }
}
