// src/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private users: User[] = [
    {
      id: 1,
      email: 'user1@example.com',
      username: 'user1',
      name: 'User 1',
      password: 'user1',
    },
    {
      id: 2,
      email: 'user2@example.com',
      username: 'user2',
      name: 'User 2',
      password: 'user2',
    },
  ];

  // Crear un nuevo usuario
  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // Obtener todos los usuarios
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Obtener un usuario por ID
  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByUsername(username: string) {
    const testUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!testUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return testUser;

    // COMMENTED OUT FOR TESTING
    // const user = await this.prisma.user.findUnique({
    //   where: { username },
    // });
    // if (!user) {
    //   throw new NotFoundException(`User with username ${username} not found`);
    // }
    // return user;
  }

  // Actualizar un usuario por ID
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Eliminar un usuario por ID
  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
