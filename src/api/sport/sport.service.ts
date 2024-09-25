import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';

@Injectable()
export class SportService {
  constructor(private readonly prisma: PrismaService) {}

  async createSport(data: CreateSportDto) {
    return await this.prisma.sport.create({
      data,
    });
  }

  async getSports() {
    return await this.prisma.sport.findMany({
      include: {
        matches: true,
      },
    });
  }

  async getSportsById(id: number) {
    const sport = await this.prisma.sport.findUnique({
      where: { id },
      include: {
        matches: true,
      },
    });
    if (!sport) throw new NotFoundException(`Sport with ID ${id} not found`);
    return sport;
  }

  async updateSport(id: number, data: UpdateSportDto) {
    const sport = await this.prisma.sport.update({
      where: { id },
      data,
    });
    return sport;
  }

  async deleteSport(id: number) {
    const sport = await this.prisma.sport.delete({
      where: { id },
    });
    return sport;
  }
}
