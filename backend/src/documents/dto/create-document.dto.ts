import { IsEnum, IsInt, IsString } from 'class-validator';
import { DocumentType } from '../../generated/prisma/client.js';

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsString()
  filePath: string;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsInt()
  policyId: number;
}
