"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const transactionRouter_1 = require("./routers/transactionRouter");
const userRouter_1 = require("./routers/userRouter");
const currencySolutionsRouter_1 = require("./routers/currencySolutionsRouter");
const atlanticMoneyRouter_1 = require("./routers/atlanticMoneyRouter");
const xeRouter_1 = require("./routers/xeRouter");
const ofxRouter_1 = require("./routers/ofxRouter");
const allRatesRouter_1 = require("./routers/allRatesRouter");
const instaremRouter_1 = require("./routers/instaremRouter");
const t = server_1.initTRPC.create();
exports.appRouter = t.router({
    health: t.procedure.query(() => {
        console.log("Health check endpoint hit");
        return { status: "ok" };
    }),
    transaction: transactionRouter_1.transactionRouter,
    user: userRouter_1.userRouter,
    currencySolutions: currencySolutionsRouter_1.currencySolutionsRouter,
    atlanticMoney: atlanticMoneyRouter_1.atlanticMoneyRouter,
    xe: xeRouter_1.xeRouter,
    ofx: ofxRouter_1.ofxRouter,
    allRates: allRatesRouter_1.allRatesRouter,
    instarem: instaremRouter_1.instaremRouter,
});
