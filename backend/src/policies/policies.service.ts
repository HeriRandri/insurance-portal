import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePolicyDto } from './dto/create-policy.dto.js';

@Injectable()
export class PoliciesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.policy.findMany({
      include: {
        client: true,
      },
    });
  }

  create(dto: CreatePolicyDto) {
    return this.prisma.policy.create({
      data: {
        policyNumber: dto.policyNumber,
        policyType: dto.policyType,
        carrier: dto.carrier,
        coverageAmount: dto.coverageAmount,
        clientId: dto.clientId,
      },
    });
  }
}