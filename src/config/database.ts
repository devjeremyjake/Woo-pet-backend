// import { PrismaClient } from '@prisma/client';
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

export default prisma;
