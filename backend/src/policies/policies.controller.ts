import { Body, Controller, Get, Post } from '@nestjs/common';
import { PoliciesService } from './policies.service.js';
import { CreatePolicyDto } from './dto/create-policy.dto.js';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  findAll() {
    return this.policiesService.findAll();
  }

  @Post()
  create(@Body() dto: CreatePolicyDto) {
    return this.policiesService.create(dto);
  }
}