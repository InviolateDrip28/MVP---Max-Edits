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
exports.currencySolutionsRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const axios_1 = __importDefault(require("axios"));
const t = server_1.initTRPC.create();
// example response
// {
//   "data": {
//     "pair": {
//       "base": {
//         "code": "GBP",
//         "name": ""
//       },
//       "quote": {
//         "code": "EUR",
//         "name": ""
//       },
//       "isMarket": false
//     },
//     "date": "2024-10-14T09:16:29.619921749Z",
//     "bid": 1.306532114229674,
//     "offer": 1.3066268898697744
//   }
// }
// https://api.currencysolutions.com/rates/v1/rates/GBPEUR
exports.currencySolutionsRouter = t.router({
    getCurrencySolutionsRate: t.procedure
        .input(zod_1.z.object({
        sell: zod_1.z.string().length(3),
        buy: zod_1.z.string().length(3),
    }))
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const { sell, buy } = opts.input;
        try {
            const response = yield axios_1.default.get(`${process.env.CS_URL}/${sell}${buy}`, {
                headers: {
                    "x-api-key": process.env.CS_KEY,
                },
            });
            const csRate = response.data.data.offer;
            console.log("Currency Solution Rate:", csRate);
            return csRate;
        }
        catch (error) {
            console.error("Error fetching Currency Solution rate:", error);
            throw new Error("Failed to fetch Currency Solution  rate");
        }
    })),
});
