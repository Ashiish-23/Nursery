import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create roles
  const roles = [
    {
      role_name: 'B2C_BUYER',
      description: 'Individual retail buyer',
    },
    {
      role_name: 'B2B_BUYER',
      description: 'Business bulk buyer',
    },
    {
      role_name: 'NURSERY_SELLER',
      description: 'Nursery or seller',
    },
  ];

  for (const role of roles) {
    const existingRole = await prisma.roles.findUnique({
      where: { role_name: role.role_name },
    });

    if (!existingRole) {
      await prisma.roles.create({
        data: role,
      });
      console.log(`Created role: ${role.role_name}`);
    } else {
      console.log(`Role ${role.role_name} already exists`);
    }
  }

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
