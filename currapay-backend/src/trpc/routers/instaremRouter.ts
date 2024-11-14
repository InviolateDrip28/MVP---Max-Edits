import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios from "axios";
import * as crypto from "crypto";

const t = initTRPC.create();

// example https://www.instarem.com/api/v1/public/payment-method/fee?source_currency=USD&source_amount=10&destination_currency=INR&country_code=US

export const instaremRouter = t.router({
  // to get value from direct debit
  getInstaremRate: t.procedure
    .input(
      z.object({
        sell: z.string().length(3),
        buy: z.string().length(3),
        country: z.string().length(2),
        amount: z.number().positive(),
      })
    )
    .query(async (opts) => {
      const { sell, buy, country, amount } = opts.input;
      try {
        const response = await axios.get(
          `${process.env.I_URL}/v1/public/payment-method/fee`,
          {
            params: {
              source_currency: sell,
              source_amount: amount,
              destination_currency: buy,
              country_code: country,
            },
          }
        );

        const directDepositValue = response.data.data[0]?.value;
        console.log("Instarem Rate:", response.data);
        return directDepositValue;
      } catch (error) {
        console.error("Error fetching Instarem rate:", error);
        throw new Error("Failed to fetch Instarem rate");
      }
    }),
});
