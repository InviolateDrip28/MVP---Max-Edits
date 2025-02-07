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
// import ratesData from "../data/rates.json"

const t = initTRPC.create();
const fs = require("fs");
const path = require("path");

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
  ratesData: t.procedure.query(() => {
    const filepath = path.join(__dirname, "/data/rates.json");
    const readData = () =>
      fs.readFileSync(filepath, "utf8", (err: any, data: any) => {
        if (err) {
          console.error("Error reading rates data:", err);
        }
        return data;
      });

    const data = JSON.parse(readData());
    return data !== undefined ? data : [];
  }),
});

export type AppRouter = typeof appRouter;
