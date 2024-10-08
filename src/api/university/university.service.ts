// university.service.ts

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversityService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear una nueva universidad
  async createUniversity(data: CreateUniversityDto) {
    try {
      return await this.prisma.university.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `University with name "${data.name}" already exists`,
        );
      }
      throw error;
    }
  }

  // Obtener todas las universidades
  async getUniversities() {
    return await this.prisma.university.findMany({
      include: {
        teams: true, // Incluye los equipos asociados a la universidad
      },
    });
  }

  // Obtener una universidad por su ID
  async getUniversityById(id: number) {
    const university = await this.prisma.university.findUnique({
      where: { id },
      include: {
        teams: true,
      },
    });
    if (!university)
      throw new NotFoundException(`University with ID ${id} not found`);
    return university;
  }

  // Actualizar una universidad por su ID
  async updateUniversity(id: number, data: UpdateUniversityDto) {
    const university = await this.prisma.university.update({
      where: { id },
      data,
    });
    return university; // No es necesario lanzar NotFoundException aquí.
  }

  // Eliminar una universidad por su ID
  async deleteUniversity(id: number) {
    const university = await this.prisma.university.delete({
      where: { id },
    });
    return university;
  }
}
