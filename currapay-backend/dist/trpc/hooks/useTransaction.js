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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransaction = void 0;
const prismaClient_1 = __importDefault(require("../../db/prismaClient"));
exports.useTransaction = {
    getAllTransactions: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Fetching all transactions...");
            return yield prismaClient_1.default.transaction.findMany();
        }
        catch (error) {
            console.error("Error fetching transactions:", error);
            throw new Error("Failed to fetch transactions");
        }
    }),
    getTransactionById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`Fetching transaction with ID: ${id}`);
            return yield prismaClient_1.default.transaction.findUnique({ where: { id } });
        }
        catch (error) {
            console.error(`Error fetching transaction with ID ${id}:`, error);
            throw new Error(`Failed to fetch transaction with ID ${id}`);
        }
    }),
    createTransaction: (transactionData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield prismaClient_1.default.transaction.create({ data: transactionData });
        }
        catch (error) {
            console.error("Error creating transaction:", error);
            throw new Error("Failed to create transaction");
        }
    }),
    updateTransaction: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield prismaClient_1.default.transaction.update({ where: { id }, data });
        }
        catch (error) {
            console.error(`Error updating transaction with ID ${id}:`, error);
            throw new Error(`Failed to update transaction with ID ${id}`);
        }
    }),
    deleteTransaction: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prismaClient_1.default.transaction.delete({ where: { id } });
            return true;
        }
        catch (error) {
            console.error(`Error deleting transaction with ID ${id}:`, error);
            return false;
        }
    }),
};
