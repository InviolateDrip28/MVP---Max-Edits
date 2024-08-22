// app context
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type AppContext = {
  prisma: PrismaClient;
};

export function createContext(): AppContext {
  return {
    prisma,
  };
}
