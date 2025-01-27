import { PrismaClient } from "@prisma/client";

// Verifica se já existe uma instância do PrismaClient para evitar múltiplas conexões no ambiente de desenvolvimento
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Logs úteis para depuração
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
