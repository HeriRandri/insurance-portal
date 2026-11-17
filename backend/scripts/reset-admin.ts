
import 'dotenv/config';
import { hash } from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const password = process.env.ADMIN_NEW_PASSWORD;

  if (!password || password.length < 12) {
    throw new Error(
      'Le nouveau mot de passe doit contenir au moins 12 caractères.',
    );
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.update({
    where: { email: 'admin@test.com' },
    data: { passwordHash },
  });

  console.log('Mot de passe ADMIN réinitialisé avec succès.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
