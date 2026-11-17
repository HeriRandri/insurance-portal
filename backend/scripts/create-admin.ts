
import 'dotenv/config';
import { hash } from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@test.com';

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('Ce compte existe déjà.');
    return;
  }

  const password = process.env.ADMIN_INITIAL_PASSWORD;

  if (!password || password.length < 12) {
    throw new Error(
      'Définissez ADMIN_INITIAL_PASSWORD avec au moins 12 caractères.',
    );
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Compte ADMIN créé avec succès.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
