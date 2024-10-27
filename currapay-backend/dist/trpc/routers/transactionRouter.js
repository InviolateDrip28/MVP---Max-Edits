"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const useTransaction_1 = require("../hooks/useTransaction");
const t = server_1.initTRPC.create();
exports.transactionRouter = t.router({
    getAllTransactions: t.procedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        return yield useTransaction_1.useTransaction.getAllTransactions();
    })),
    getTransactionById: t.procedure
        .input(zod_1.z.number())
        .query((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield useTransaction_1.useTransaction.getTransactionById(input);
    })),
    createTransaction: t.procedure
        .input(zod_1.z.object({
        userId: zod_1.z.number(),
        amount: zod_1.z.number(),
        currency: zod_1.z.string(),
        exchangeRate: zod_1.z.number(),
        fees: zod_1.z.number(),
        processingTime: zod_1.z.number(),
        transferMethod: zod_1.z.string(),
        purposeOfTransfer: zod_1.z.string(),
        status: zod_1.z.string(),
    }))
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield useTransaction_1.useTransaction.createTransaction(input);
    })),
    updateTransaction: t.procedure
        .input(zod_1.z.object({
        id: zod_1.z.number(),
        data: zod_1.z.object({
            userId: zod_1.z.number().optional(),
            amount: zod_1.z.number().optional(),
            currency: zod_1.z.string().optional(),
            exchangeRate: zod_1.z.number().optional(),
            fees: zod_1.z.number().optional(),
            processingTime: zod_1.z.number().optional(),
            transferMethod: zod_1.z.string().optional(),
            purposeOfTransfer: zod_1.z.string().optional(),
            status: zod_1.z.string().optional(),
        }),
    }))
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield useTransaction_1.useTransaction.updateTransaction(input.id, input.data);
    })),
    deleteTransaction: t.procedure
        .input(zod_1.z.number())
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield useTransaction_1.useTransaction.deleteTransaction(input);
    })),
});
