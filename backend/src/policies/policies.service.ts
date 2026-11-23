import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePolicyDto } from './dto/create-policy.dto.js';
import { UpdatePolicyDto } from './dto/update-policy.dto.js';

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

  async findOne (id:number){
    const policy = await this.prisma.policy.findUnique({
      where:{id},
      include :{
        client:true
      }
    })
    if(!policy){
      throw new NotFoundException(
        ` Assurance avec ${id} introuvable`
      )
    }
    return policy
  }

  create(dto: CreatePolicyDto) {
    if (dto.effectiveDate && dto.expirationDate) {
  const effectiveDate = new Date(dto.effectiveDate);
  const expirationDate = new Date(dto.expirationDate);

  if (expirationDate <= effectiveDate) {
    throw new BadRequestException(
      "La date d'expiration doit être postérieure à la date d'effet.",
    );
  }
}
    return this.prisma.policy.create({
      data: {
        policyNumber: dto.policyNumber,
        policyType: dto.policyType,
        carrier: dto.carrier,
        coverageAmount: dto.coverageAmount,
        eachOccurrence: dto.eachOccurrence,
        generalAggregate:dto.generalAggregate,
        clientId: dto.clientId,
        effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate): undefined,
        expirationDate: dto.expirationDate ? new Date(dto.expirationDate) : undefined
      },
    });
  }


async update(id: number, dto: UpdatePolicyDto) {
  const  policy = await this.findOne(id);
  const effectiveDate= dto.effectiveDate ? new Date(dto.effectiveDate ):undefined
  const expirationDate = dto.expirationDate ? new Date(dto.expirationDate): undefined

 if(effectiveDate && expirationDate && expirationDate <=  effectiveDate){
  throw new BadRequestException(
    "La date d'expiration doit être postérieure à la date d'effet.",
  );
 }

  return this.prisma.policy.update({
    where: { id },
    data: {
      policyNumber: dto.policyNumber,
      policyType: dto.policyType,
      carrier: dto.carrier,
      coverageAmount: dto.coverageAmount,
      eachOccurrence: dto.eachOccurrence,
      generalAggregate:dto.generalAggregate,
      status: dto.status,
      effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate): undefined,
      expirationDate: dto.expirationDate ? new Date(dto.expirationDate) : undefined
    },
  });
}

}