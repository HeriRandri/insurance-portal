import { IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { DocumentType } from '../../generated/prisma/client.js';

export class UploadDocumentDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  policyId: number;

  @IsEnum(DocumentType)
  type: DocumentType;
}
