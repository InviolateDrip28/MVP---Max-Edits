"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const transactionRouter_1 = require("./routers/transactionRouter");
const userRouter_1 = require("./routers/userRouter");
const currencySolutionsRouter_1 = require("./routers/currencySolutionsRouter");
const t = server_1.initTRPC.create();
exports.appRouter = t.router({
    transaction: transactionRouter_1.transactionRouter,
    user: userRouter_1.userRouter,
    currencySolutions: currencySolutionsRouter_1.currencySolutionsRouter,
});
