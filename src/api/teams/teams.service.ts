import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTeam(data: CreateTeamDto) {
    return await this.prisma.team.create({
      data,
    });
  }

  async getTeams() {
    return await this.prisma.team.findMany({
      include: {
        university: true,
        matchesLocal: true,
        matchesVisitor: true,
      },
    });
  }

  async getTeamById(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
      include: {
        university: true,
        matchesLocal: true,
        matchesVisitor: true,
      },
    });
    if (!team) throw new NotFoundException(`Team with ID ${id} not found`);
    return team;
  }

  async updateTeam(id: number, data: UpdateTeamDto) {
    const team = await this.prisma.team.update({
      where: { id },
      data,
    });
    if (!team) throw new NotFoundException(`Team with ID ${id} not found`);
    return team;
  }

  async deleteTeam(id: number) {
    const team = await this.prisma.team.delete({
      where: { id },
    });
    if (!team) throw new NotFoundException(`Team with ID ${id} not found`);
    return team;
  }
}
