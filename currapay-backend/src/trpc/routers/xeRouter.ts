import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios from "axios";
import * as crypto from "crypto";

const t = initTRPC.create();

export const xeRouter = t.router({
  //to get a single rate
  getXeRate: t.procedure
    .input(
      z.object({
        sell: z.string().length(3),
        buy: z.string().length(3),
        amount: z.number().positive(),
        country: z.string().length(2),
        destinationCountry: z.string().length(2),
        fixed_currency: z.enum(["sell", "buy"]),
      })
    )
    .query(async (opts) => {
      const { sell, buy, amount, country, destinationCountry, fixed_currency } =
        opts.input;

      try {
        const authHeader = `Basic ${Buffer.from(
          `${process.env.XE_ID}:${process.env.XE_KEY}`
        ).toString("base64")}`;

        const response = await axios.get(
          `${process.env.XE_URL}/v2/tradeable_rate`,
          {
            headers: {
              Authorization: authHeader,
            },
            params: {
              sell,
              buy,
              amount,
              country,
              destinationCountry,
              fixed_currency,
            },
          }
        );

        // uncomment for full response data
        // console.log('XE API response:', response.data);
        // return response.data;

        const rate = response.data.rates[0]?.rate;
        console.log("XE API rate:", rate);
        return rate;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching XE rate:", error.response?.data);
          throw new Error(
            `XE API error: ${error.response?.data?.message || error.message}`
          );
        } else {
          console.error("Unexpected error:", error);
          throw new Error(`Error occurred: ${error}`);
        }
      }
    }),

  // To get the values for the rates table
  // rates for these currencies => ["USD", "GBP", "EUR", "CAD", "CHF", "AUD", "BRL", "JPY"];
  // RUB is not tradeable
  // INR is tradeable only between 07:00 to 17:30 NZST
  // sell currency cannot equal the currency of buy
  getXeRatesTable: t.procedure.query(async (opts) => {
    const currencies: string[] = [
      "USD",
      "GBP",
      "EUR",
      "CAD",
      "CHF",
      "AUD",
      "BRL",
      "JPY",
    ];

    const currencyToCountryCode: Record<string, string> = {
      USD: "US",
      GBP: "GB",
      EUR: "FR", // use the country code for France for the euro currency
      CAD: "CA",
      CHF: "CH",
      AUD: "AU",
      BRL: "BR",
      JPY: "JP",
    };

    let resultArr: (string | null)[][] = [];

    for (const sell of currencies) {
      const tmpArr: (string | null)[] = [];

      for (const buy of currencies) {
        if (sell !== buy) {
          try {
            const authHeader = `Basic ${Buffer.from(
              `${process.env.XE_ID}:${process.env.XE_KEY}`
            ).toString("base64")}`;

            const response = await axios.get(
              `${process.env.XE_URL}/v2/tradeable_rate`,
              {
                headers: {
                  Authorization: authHeader,
                },
                params: {
                  sell,
                  buy,
                  amount: 500,
                  country: currencyToCountryCode[sell],
                  destinationCountry: currencyToCountryCode[buy],
                  fixed_currency: "buy",
                },
              }
            );

            const rate = response.data.rates[0]?.rate || "N/A";
            tmpArr.push(rate);
          } catch (error) {
            tmpArr.push("N/A");
          }
        } else {
          tmpArr.push("N/A");
        }
      }
      resultArr.push(tmpArr);
    }

    // console.log("XE Rates Table:", resultArr);
    console.log("XE Rates Table generated");
    return resultArr;
  }),
});
