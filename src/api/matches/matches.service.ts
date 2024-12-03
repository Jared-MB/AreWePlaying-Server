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

  async getMatches({
    sport,
    date = {} as any,
    category,
  }: {
    sport?: number;
    date?:
      | {
          from: Date;
          to: Date;
        }
      | {
          from: Date;
        };
    category?: string;
  }) {
    return await this.prisma.match.findMany({
      include: {
        localTeam: true,
        visitorTeam: true,
        sport: true,
      },
      where: {
        gender: category,
        date: {
          gte: date?.from,
          lte: 'to' in date ? date.to : (date.from ?? undefined),
        },
        sport: {
          id: sport,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async getByDateRange(from: Date, to: Date) {
    return await this.prisma.match.findMany({
      include: {
        localTeam: true,
        visitorTeam: true,
        sport: true,
      },
      where: {
        date: {
          gte: from,
          lt: to,
        },
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
