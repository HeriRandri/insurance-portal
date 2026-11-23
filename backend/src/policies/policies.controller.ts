import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../generated/prisma/client.js';
import { PoliciesService } from './policies.service.js';
import { CreatePolicyDto } from './dto/create-policy.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UpdatePolicyDto } from './dto/update-policy.dto.js';

@Controller('policies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.policiesService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  finOne(@Param('id',ParseIntPipe) id: number){
    return this.policiesService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreatePolicyDto) {
    return this.policiesService.create(dto);
  }
  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id', ParseIntPipe) id:number, @Body() dto:UpdatePolicyDto,){
    return this.policiesService.update(id, dto)
  }

}