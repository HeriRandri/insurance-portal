
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  PolicyType,
  PolicyStatus,
} from '../../generated/prisma/client.js';

export class UpdatePolicyDto {
  @IsOptional()
  @IsString()
  policyNumber?: string;

  @IsOptional()
  @IsEnum(PolicyType)
  policyType?: PolicyType;

  @IsOptional()
  @IsString()
  carrier?: string;

  @IsOptional()
  @IsNumber()
  coverageAmount?: number;
  @IsOptional()
@IsNumber()
eachOccurrence?: number;

  @IsOptional()
@IsNumber()
generalAggregate?: number;

  @IsOptional()
  @IsEnum(PolicyStatus)
  status?: PolicyStatus;

  @IsOptional()
  @IsDateString()
  effectiveDate?: string;

 @IsOptional()
 @IsDateString()
 expirationDate?: string;
}
