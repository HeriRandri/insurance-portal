import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.client.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
        policies: true,
      },
    });
  }

  findMe(userId: number) {
  return this.prisma.client.findUnique({
    where: {
      userId,
    },
    include: {
      policies: true,
    },
  });
}

  create(dto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        businessName: dto.businessName,
        phone: dto.phone,
        address: dto.address,
        userId: dto.userId,
      },
    });
  }
}