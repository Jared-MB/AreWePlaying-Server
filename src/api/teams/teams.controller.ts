import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';

@Controller('teams')
export class TeamsController {
  @Get()
  getAllTeams() {
    return 'Get teams';
  }

  @Post()
  createTeam(@Body() _teamDto: any) {
    return 'Post teams';
  }

  @Put(':id')
  updateTeam(@Param('id') id: string, @Body() _teamDto: any) {
    return `Put id: ${id} team`;
  }
}
