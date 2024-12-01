import { initTRPC } from "@trpc/server";
import { transactionRouter } from "./routers/transactionRouter";
import { userRouter } from "./routers/userRouter";
import { currencySolutionsRouter } from "./routers/currencySolutionsRouter";
import { atlanticMoneyRouter } from "./routers/atlanticMoneyRouter";
import { xeRouter } from "./routers/xeRouter";
import { ofxRouter } from "./routers/ofxRouter";
import { allRatesRouter } from "./routers/allRatesRouter";
import { instaremRouter } from "./routers/instaremRouter";
import { westernUnionRouter } from "./routers/westernUnionRouter";

const t = initTRPC.create();

export const appRouter = t.router({
  health: t.procedure.query(() => {
    console.log("Health check endpoint hit");
    return { status: "ok" };
  }),
  transaction: transactionRouter,
  user: userRouter,
  currencySolutions: currencySolutionsRouter,
  atlanticMoney: atlanticMoneyRouter,
  xe: xeRouter,
  ofx: ofxRouter,
  allRates: allRatesRouter,
  instarem: instaremRouter,
  westernUnion: westernUnionRouter,
});

export type AppRouter = typeof appRouter;
