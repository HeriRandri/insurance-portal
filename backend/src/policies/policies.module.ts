import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service.js';
import { PoliciesController } from './policies.controller.js';

@Module({
  providers: [PoliciesService],
  controllers: [PoliciesController]
})
export class PoliciesModule {}
