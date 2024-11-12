import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';

@Injectable()
export class SportService {
  constructor(private readonly prisma: PrismaService) {}

  async createSport(data: CreateSportDto) {
    try {
      return await this.prisma.sport.create({
        data,
      });
    } catch (error) {
      // Verifica si el error es por violación de restricción única
      if (error.code === 'P2002') {
        // Código de error específico de Prisma para duplicados
        throw new ConflictException(
          `Sport with name "${data.name}" already exists`,
        );
      }
      throw error; // Lanza otros errores no manejados
    }
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
