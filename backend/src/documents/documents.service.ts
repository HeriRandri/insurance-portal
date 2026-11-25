import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { UploadDocumentDto } from './dto/upload-document.dto.js';

import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { mkdir, writeFile, unlink } from 'node:fs/promises';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findByPolicy(policyId: number) {
    const policy = await this.prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });

    if (!policy) {
      throw new NotFoundException(
        "L'assurance demandée n'existe pas.",
      );
    }

    return this.prisma.document.findMany({
      where: {
        policyId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async upload(
    file: Express.Multer.File,
    dto: UploadDocumentDto,
  ) {
    const policy = await this.prisma.policy.findUnique({
      where: {
        id: dto.policyId,
      },
    });

    if (!policy) {
      throw new NotFoundException(
        "L'assurance demandée n'existe pas.",
      );
    }

    const filename = `${randomUUID()}.pdf`;

    const directory = join(
      process.cwd(),
      'uploads',
      'documents',
    );

    await mkdir(directory, {
      recursive: true,
    });

    const filePath = join(directory, filename);

    await writeFile(filePath, file.buffer, {
      flag: 'wx',
    });

    try {
      return await this.prisma.document.create({
        data: {
          name: file.originalname,
          filePath: `uploads/documents/${filename}`,
          type: dto.type,
          policyId: dto.policyId,
        },
      });
    } catch (error) {
      await unlink(filePath).catch(() => {
        this.logger.error(
          `Impossible de supprimer le fichier ${filename}`,
        );
      });

      throw error;
    }
  }
}
