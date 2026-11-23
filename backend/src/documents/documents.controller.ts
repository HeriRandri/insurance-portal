import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  UseGuards,
  Param,
  Get
} from '@nestjs/common';

import { Role } from '../generated/prisma/client.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

import { DocumentsService } from './documents.service.js';
import { CreateDocumentDto } from './dto/create-document.dto.js';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
  ) {}

  @Get('policy/:policyId')
  @Roles(Role.ADMIN)
  findByPolicy(
    @Param('policyId', ParseIntPipe) policyId:number,
  ){
    return this.documentsService.findByPolicy(policyId)
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }
}