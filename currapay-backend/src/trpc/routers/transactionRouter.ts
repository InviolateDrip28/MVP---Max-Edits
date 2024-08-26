import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { useTransaction } from '../hooks/useTransaction'; 


const t = initTRPC.create();

export const transactionRouter = t.router({
  getAllTransactions: t.procedure.query(async () => {
    return await useTransaction.getAllTransactions();
  }),

  getTransactionById: t.procedure
    .input(z.number())
    .query(async ({ input }) => {
      return await useTransaction.getTransactionById(input);
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
      return await useTransaction.createTransaction(input);
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
      return await useTransaction.updateTransaction(input.id, input.data);
    }),

  deleteTransaction: t.procedure
    .input(z.number())
    .mutation(async ({ input }) => {
      return await useTransaction.deleteTransaction(input);
    }),
});
