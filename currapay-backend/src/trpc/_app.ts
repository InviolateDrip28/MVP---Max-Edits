import { initTRPC } from '@trpc/server';
import { transactionRouter } from './routers/transactionRouter';
import { userRouter } from './routers/userRouter';
import { currencySolutionsRouter } from './routers/currencySolutionsRouter';

const t = initTRPC.create();

export const appRouter = t.router({
  transaction: transactionRouter,
  user: userRouter,
  currencySolutions: currencySolutionsRouter,
});

export type AppRouter = typeof appRouter;
