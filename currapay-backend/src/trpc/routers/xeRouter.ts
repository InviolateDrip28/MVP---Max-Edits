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

  //to get multiple rates
  getMultipleXeRates: t.procedure
    .input(
      z.object({
        sell: z.string().length(3),
        buyArray: z.array(z.string().length(3)),
        amount: z.number().positive(),
        fixed_currency: z.enum(["sell", "buy"]),
      })
    )
    .query(async (opts) => {
      const { sell, buyArray, amount, fixed_currency } = opts.input;

      const rates: Record<
        string,
        { rate: number; country: string; destinationCountry: string }
      > = {};

      const currencyToCountryCode: Record<string, string> = {
        USD: "US",
        GBP: "GB",
        EUR: "FR", // use the country code for France for the euro currency
        CAD: "CA",
        CHF: "CH",
        AUD: "AU",
        RUB: "RU",
        INR: "IN",
      };

      const ratePromises = buyArray.map(async (buy) => {
        const isBuying = fixed_currency === "buy";
        const country = isBuying
          ? currencyToCountryCode[buy]
          : currencyToCountryCode[sell];
        const destinationCountry = isBuying
          ? currencyToCountryCode[buy]
          : currencyToCountryCode[sell];

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
                sell: sell,
                buy: buy,
                amount,
                country,
                destinationCountry,
                fixed_currency,
              },
            }
          );

          const rate = response.data.rates[0]?.rate;
          if (rate) {
            rates[buy] = { rate, country, destinationCountry };
          }
        } catch (error) {
          console.error(`Error fetching rate for ${buy}:`, error);
        }
      });

      await Promise.all(ratePromises);
      console.log(rates);
      return rates;
    }),
});
