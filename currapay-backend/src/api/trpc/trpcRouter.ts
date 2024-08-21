import { initTRPC } from '@trpc/server';
import { transactionRouter } from './routers/transactionRouter';
import { userRouter } from './routers/userRouter';

const t = initTRPC.create();

export const appRouter = t.router({
  transaction: transactionRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
