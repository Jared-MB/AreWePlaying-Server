import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';

@Controller('universities')
export class UniversitiesController {
  @Get()
  getAllUniversities() {
    return 'get universidades';
  }

  @Post()
  createUniversity(@Body() universityDto: any) {
    return 'post universidades';
  }

  @Put(':id')
  updateUniversity(@Param('id') id: string, @Body() universityDto: any) {
    return `put id: ${id} universidades`;
  }
}
