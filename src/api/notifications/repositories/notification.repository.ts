import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { NotificationDto } from '../dtos/notification.dto';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByUserId(userId: number) {
    return this.prisma.notification.findMany({
      where: {
        userId: userId,
      },
      include: {
        match: {
          include: {
            sport: true,
            localTeam: true,
            visitorTeam: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getAllByMatchId(matchId: number) {
    return this.prisma.notification.findMany({
      include: {
        user: true,
      },
      where: {
        isActive: true,
        matchId,
      },
    });
  }

  async getByDateRange(from: Date, to: Date) {
    return this.prisma.notification.findMany({
      include: {
        match: {
          include: {
            visitorTeam: true,
            localTeam: true,
          },
        },
        user: true,
      },
      where: {
        match: {
          date: {
            gte: from,
            lt: to,
          },
        },
      },
    });
  }

  async create(notification: Omit<NotificationDto, 'id'>) {
    return this.prisma.notification.create({
      data: notification,
    });
  }

  async update(notification: Partial<NotificationDto>) {
    return this.prisma.notification.update({
      where: {
        id: notification.id,
        userId: notification.userId,
      },
      data: notification,
    });
  }

  async remove(matchId: number, userId: number, notificationId: number) {
    return this.prisma.notification.delete({
      where: {
        matchId,
        userId,
        id: notificationId,
      },
    });
  }
}
