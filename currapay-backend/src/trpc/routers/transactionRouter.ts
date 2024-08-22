import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import prisma from '../../db/prismaClient'; 

const t = initTRPC.create();

export const transactionRouter = t.router({
  getAllTransactions: t.procedure
    .query(async () => {
      try {
        console.log("Fetching all transactions...");
        return await prisma.transaction.findMany();
      } catch (error) {
        console.error("Error fetching transactions:", error);
        throw new Error("Failed to fetch transactions");
      }
    }),
  
  getTransactionById: t.procedure
    .input(z.number())
    .query(async ({ input }) => {
      try {
        console.log(`Fetching transaction with ID: ${input}`);
        return await prisma.transaction.findUnique({
          where: { id: input },
        });
      } catch (error) {
        console.error(`Error fetching transaction with ID ${input}:`, error);
        throw new Error(`Failed to fetch transaction with ID ${input}`);
      }
    }),
  
  createTransaction: t.procedure
    .input(z.object({
      userId: z.number(),
      amount: z.number(),
      currency: z.string(),
      exchangeRate: z.number(),
      fees: z.number(),
      processingTime: z.number(),
      transferMethod: z.string(),
      purposeOfTransfer: z.string(),
      status: z.string(),
      timestamp: z.date(),
    }))
    .mutation(async ({ input }) => {
      try {
        return await prisma.transaction.create({
          data: input,
        });
      } catch (error) {
        console.error("Error creating transaction:", error);
        throw new Error("Failed to create transaction");
      }
    }),
  
  updateTransaction: t.procedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        userId: z.number().optional(),
        amount: z.number().optional(),
        currency: z.string().optional(),
        exchangeRate: z.number().optional(),
        fees: z.number().optional(),
        processingTime: z.number().optional(),
        transferMethod: z.string().optional(),
        purposeOfTransfer: z.string().optional(),
        status: z.string().optional(),
        timestamp: z.date().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      try {
        return await prisma.transaction.update({
          where: { id: input.id },
          data: input.data,
        });
      } catch (error) {
        console.error(`Error updating transaction with ID ${input.id}:`, error);
        throw new Error(`Failed to update transaction with ID ${input.id}`);
      }
    }),
  
  deleteTransaction: t.procedure
    .input(z.number())
    .mutation(async ({ input }) => {
      try {
        await prisma.transaction.delete({
          where: { id: input },
        });
        return true;
      } catch (error) {
        console.error(`Error deleting transaction with ID ${input}:`, error);
        return false;
      }
    }),
});
