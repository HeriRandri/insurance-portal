import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PolicyType } from '../../generated/prisma/client.js';

export class CreatePolicyDto {
  @IsString()
  policyNumber: string;

  @IsEnum(PolicyType)
  policyType: PolicyType;

  @IsOptional()
  @IsString()
  carrier?: string;

  @IsOptional()
  @IsNumber()
  coverageAmount?: number;

  @IsInt()
  clientId: number;
}
