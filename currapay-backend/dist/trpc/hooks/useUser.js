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
exports.useUser = void 0;
const prismaClient_1 = __importDefault(require("../../db/prismaClient"));
const argon2_1 = __importDefault(require("argon2"));
exports.useUser = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield prismaClient_1.default.user.findMany();
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield prismaClient_1.default.user.findUnique({ where: { id } });
        }
        catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw new Error(`Failed to fetch user with ID ${id}`);
        }
    }),
    createUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPassword = yield argon2_1.default.hash(userData.password);
            return yield prismaClient_1.default.user.create({
                data: Object.assign(Object.assign({}, userData), { password: hashedPassword, createdAt: new Date(), updatedAt: new Date() }),
            });
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }),
    updateUser: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateData = Object.assign(Object.assign({}, data), { updatedAt: new Date() });
            if (data.password) {
                updateData.password = yield argon2_1.default.hash(data.password);
            }
            return yield prismaClient_1.default.user.update({ where: { id }, data: updateData });
        }
        catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
            throw new Error(`Failed to update user with ID ${id}`);
        }
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prismaClient_1.default.user.delete({ where: { id } });
            return true;
        }
        catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            return false;
        }
    }),
};
