import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { CreateMatchtDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async createMatch(data: CreateMatchtDto) {
    return await this.prisma.match.create({
      data,
    });
  }

  async getMatches() {
    return await this.prisma.match.findMany({
      include: {
        localTeam: true,
        visitorTeam: true,
        sport: true,
      },
    });
  }

  async findOneById(id: number) {
    const match = await this.prisma.match.findUnique({
      where: { id },
    });
    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }
    return match;
  }

  async updateMatch(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.prisma.match.update({
      where: { id },
      data: updateMatchDto,
    });
    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }
    return match;
  }

  async remove(id: number) {
    const match = await this.prisma.match.delete({
      where: { id },
    });
    if (!match) {
      throw new NotFoundException(`Mathc with id ${id} not found`);
    }
    return match;
  }
}
