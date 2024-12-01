import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios from "axios";

const t = initTRPC.create();

// example input and example output at the bottom of file

export const westernUnionRouter = t.router({
  getWesternUnionRate: t.procedure
    .input(
      z.object({
        sell: z.string().length(3),
        buy: z.string().length(3),
        amount: z.number().positive(),
        country: z.string().length(2),
        destinationCountry: z.string().length(2),
      })
    )
    .query(async (opts) => {
      const { sell, buy } = opts.input;
      try {
        const response = await axios.get(
          `${process.env.WU_URL}/wuconnect/prices/products`,
          {
            headers: {
              "x-api-key": process.env.WU_KEY!,
            },
          }
        );

        const wuRate = response.data.products[0].exchangeRate;
        console.log("Western Union Rate:", wuRate);
        return wuRate;
      } catch (error) {
        console.error("Error fetching Western Union rate:", error);
        throw new Error("Failed to fetch Western Union rate");
      }
    }),
});

// example input
// {
//     "origination": {
//         "country": "US",
//         "currency": "USD",
//         "sendAmount": 100
//       },
//       "destination": {
//         "country": "FR",
//         "currency": "EUR"
//       }
//     }
// which is this curl command
// curl -X POST https://www.westernunion.com/wuconnect/prices/products \
// -H "Content-Type: application/json" \
// -H "x-api-key: d53231d7-ad60-4774-b051-697a8a0dbcda" \
// -d '{
//       "origination": {
//         "country": "US",
//         "currency": "USD",
//         "sendAmount": 100
//       },
//       "destination": {
//         "country": "FR",
//         "currency": "EUR"
//       }
//     }'

// example output
// {
//     "origination": {
//       "country": "US",
//       "currency": "USD",
//       "sendAmount": 100,
//       "payin": "*"
//     },
//     "destination": {
//       "country": "FR",
//       "currency": "EUR"
//     },
//     "products": [
//       {
//         "payin": "CC",
//         "payout": "000",
//         "service": "000",
//         "name": "Money In Minutes",
//         "principalAmount": 100,
//         "payoutAmount": 94.64,
//         "exchangeRate": 0.9464,
//         "grossFee": 2.5
//       },
//       {
//         "payin": "AC",
//         "payout": "000",
//         "service": "000",
//         "name": "Money In Minutes",
//         "principalAmount": 100,
//         "payoutAmount": 94.64,
//         "exchangeRate": 0.9464,
//         "grossFee": 0
//       },
//       {
//         "payin": "GP",
//         "payout": "000",
//         "service": "000",
//         "name": "Money In Minutes",
//         "principalAmount": 100,
//         "payoutAmount": 94.64,
//         "exchangeRate": 0.9464,
//         "grossFee": 0
//       },
//       {
//         "payin": "DC",
//         "payout": "000",
//         "service": "000",
//         "name": "Money In Minutes",
//         "principalAmount": 100,
//         "payoutAmount": 94.64,
//         "exchangeRate": 0.9464,
//         "grossFee": 0
//       },
//       {
//         "payin": "CC",
//         "payout": "200",
//         "service": "201",
//         "name": "Direct To Card",
//         "principalAmount": 100,
//         "payoutAmount": 93.97,
//         "exchangeRate": 0.9397,
//         "grossFee": 2.5
//       },
//       {
//         "payin": "AC",
//         "payout": "200",
//         "service": "201",
//         "name": "Direct To Card",
//         "principalAmount": 100,
//         "payoutAmount": 93.97,
//         "exchangeRate": 0.9397,
//         "grossFee": 0
//       },
//       {
//         "payin": "GP",
//         "payout": "200",
//         "service": "201",
//         "name": "Direct To Card",
//         "principalAmount": 100,
//         "payoutAmount": 93.97,
//         "exchangeRate": 0.9397,
//         "grossFee": 0
//       },
//       {
//         "payin": "DC",
//         "payout": "200",
//         "service": "201",
//         "name": "Direct To Card",
//         "principalAmount": 100,
//         "payoutAmount": 93.97,
//         "exchangeRate": 0.9397,
//         "grossFee": 0
//       },
//       {
//         "payin": "CC",
//         "payout": "200",
//         "service": "202",
//         "name": "Direct To Card",
//         "principalAmount": 100,
//         "payoutAmount": 93.97,
//         "exchangeRate": 0.9397,
//         "grossFee": 2.5
//       },
//       {
//         "payin": "AC",
//         "payout": "200",
//         "service": "202",
//         "name": "Direct To Card",
//         "principalAmount": 100,
//         "payoutAmount": 93.97,
//         "exchangeRate": 0.9397,
//         "grossFee": 0
//       },
//       {
//         "payin": "GP",
//         "payout": "200",
//         "service": "202",
//         "name": "Direct To Card",
//         "principalAmount": 100,
//         "payoutAmount": 93.97,
//         "exchangeRate": 0.9397,
//         "grossFee": 0
//       },
//       {
//         "payin": "DC",
//         "payout": "200",
//         "service": "202",
//         "name": "Direct To Card",
//         "principalAmount": 100,
//         "payoutAmount": 93.97,
//         "exchangeRate": 0.9397,
//         "grossFee": 0
//       },
//       {
//         "payin": "CC",
//         "payout": "500",
//         "service": "500",
//         "name": "Direct to Bank",
//         "principalAmount": 100,
//         "payoutAmount": 94.33,
//         "exchangeRate": 0.9433,
//         "grossFee": 2.5
//       },
//       {
//         "payin": "AC",
//         "payout": "500",
//         "service": "500",
//         "name": "Direct to Bank",
//         "principalAmount": 100,
//         "payoutAmount": 94.33,
//         "exchangeRate": 0.9433,
//         "grossFee": 0
//       },
//       {
//         "payin": "GP",
//         "payout": "500",
//         "service": "500",
//         "name": "Direct to Bank",
//         "principalAmount": 100,
//         "payoutAmount": 94.33,
//         "exchangeRate": 0.9433,
//         "grossFee": 0
//       },
//       {
//         "payin": "DC",
//         "payout": "500",
//         "service": "500",
//         "name": "Direct to Bank",
//         "principalAmount": 100,
//         "payoutAmount": 94.33,
//         "exchangeRate": 0.9433,
//         "grossFee": 0
//       }
//     ]
//   }
