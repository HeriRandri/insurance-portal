import { Injectable,NotFoundException ,  BadRequestException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

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


async remove(id: number) {
  const client = await this.prisma.client.findUnique({
    where: { id },
    include: {
      policies: true,
    },
  });

  if (!client) {
    throw new NotFoundException(
      `Client ${id} introuvable`,
    );
  }

  if (client.policies.length > 0) {
    throw new BadRequestException(
      'Impossible de supprimer un client qui possède des assurances.',
    );
  }

  return this.prisma.client.delete({
    where: { id },
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
update(id: number, dto: UpdateClientDto) {
  return this.prisma.client.update({
    where: { id },
    data: {
      businessName: dto.businessName,
      phone: dto.phone,
      address: dto.address,
    },
  });
}

async findOne(id: number) {
  const client = await this.prisma.client.findUnique({
    where: { id },
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

  if (!client) {
    throw new NotFoundException(
      `Client avec ID ${id} introuvable`,
    );
  }

  return client;
}

}