import {PrismaClient} from '@prisma/client';

/**
 * @constant prisma
 * ? Estabelece uma conexao com o Prisma ORM instanciando a classe nativa do
 * ? Prisma (PrismaClient)
 */

const prisma = new PrismaClient();

export default prisma;
