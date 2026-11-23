import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDocumentDto } from './dto/create-document.dto.js';

@Injectable()
export class DocumentsService {
    constructor(private readonly prisma:PrismaService){}

    async findByPolicy(policyId:number){
      const policy = await this.prisma.policy.findUnique({
        where:{id: policyId}
      })
      if(!policy){
        throw new NotFoundException("L'assurance demande n'existe pas")
      }
      return this.prisma.document.findMany({
        where:{policyId},
        orderBy: {createdAt: 'desc'}
      })
    }

    async create(dto:CreateDocumentDto){
      const policy =  await this.prisma.policy.findUnique(
            {
                where: {id:dto.policyId}
            }
        )
         if (!policy) {
      throw new NotFoundException(
        "L'assurance demandée n'existe pas.",
      );
    }
   return this.prisma.document.create({
      data: {
        name: dto.name,
        filePath: dto.filePath,
        type: dto.type,
        policyId: dto.policyId,
      },
    });
    }
}
