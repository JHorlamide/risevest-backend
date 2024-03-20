import { PrismaClient } from '@prisma/client'

export async function resetDB() {
  const prisma = new PrismaClient();

  try {
    await prisma.$transaction([
      prisma.comment.deleteMany(),
      prisma.post.deleteMany(),
      prisma.user.deleteMany(),
    ])
  } catch (error) {
    console.error('Error deleting users and related data:', error);
  } finally {
    await prisma.$disconnect();
  }
}