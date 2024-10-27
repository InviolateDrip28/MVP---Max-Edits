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
exports.userRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const useUser_1 = require("../hooks/useUser");
const t = server_1.initTRPC.create();
exports.userRouter = t.router({
    getAllUsers: t.procedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        return yield useUser_1.useUser.getAllUsers();
    })),
    getUserById: t.procedure
        .input(zod_1.z.number())
        .query((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield useUser_1.useUser.getUserById(input);
    })),
    createUser: t.procedure
        .input(zod_1.z.object({
        emailAddress: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        country: zod_1.z.string(),
        city: zod_1.z.string(),
        age: zod_1.z.number().int().positive(),
        gender: zod_1.z.string(),
        occupation: zod_1.z.string(),
        nationality: zod_1.z.string(),
        deviceUsed: zod_1.z.string(),
        browserUsed: zod_1.z.string(),
    }))
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield useUser_1.useUser.createUser(input);
    })),
    updateUser: t.procedure
        .input(zod_1.z.object({
        id: zod_1.z.number(),
        data: zod_1.z.object({
            emailAddress: zod_1.z.string().email().optional(),
            password: zod_1.z.string().min(6).optional(),
            country: zod_1.z.string().optional(),
            city: zod_1.z.string().optional(),
            age: zod_1.z.number().int().positive().optional(),
            gender: zod_1.z.string().optional(),
            occupation: zod_1.z.string().optional(),
            nationality: zod_1.z.string().optional(),
            deviceUsed: zod_1.z.string().optional(),
            browserUsed: zod_1.z.string().optional(),
        }),
    }))
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield useUser_1.useUser.updateUser(input.id, input.data);
    })),
    deleteUser: t.procedure
        .input(zod_1.z.number())
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield useUser_1.useUser.deleteUser(input);
    })),
});
