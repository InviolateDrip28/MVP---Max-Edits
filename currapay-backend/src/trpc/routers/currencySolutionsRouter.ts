import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios from "axios";

const t = initTRPC.create();

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
export const currencySolutionsRouter = t.router({
  getCurrencySolutionsRate: t.procedure
    .input(
      z.object({
        sell: z.string().length(3),
        buy: z.string().length(3),
      })
    )
    .query(async (opts) => {
      const { sell, buy } = opts.input;
      try {
        const response = await axios.get(
          `${process.env.CS_URL}/${sell}${buy}`,
          {
            headers: {
              "x-api-key": process.env.CS_KEY!,
            },
          }
        );

        const csRate = response.data.data.offer;
        console.log("Currency Solution Rate:", csRate);
        return csRate;
      } catch (error) {
        console.error("Error fetching Currency Solution rate:", error);
        throw new Error("Failed to fetch Currency Solution  rate");
      }
    }),
});
