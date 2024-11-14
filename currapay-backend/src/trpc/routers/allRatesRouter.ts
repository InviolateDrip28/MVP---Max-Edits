import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios from "axios";

const t = initTRPC.create();

export const allRatesRouter = t.router({
  getRankedRates: t.procedure
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

      // Get XE Rate
      let xeRate: number | null = null;
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

        xeRate = response.data.rates[0]?.rate || null;
        console.log("XE rate:", xeRate);
      } catch (error) {
        console.error("Error fetching XE rate:", error);
        throw new Error("Failed to fetch XE rate");
      }

      // Get OFX Rate
      let ofxRate: number | null = null;
      try {
        const response = await axios.get(
          `${process.env.OFX_URL}/ofxrates/${sell}/${buy}/${amount}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.OFX_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        ofxRate = response.data.ofxRate || null;
        console.log("OFX Rate:", ofxRate);
      } catch (error) {
        console.error("Error fetching OFX rate:", error);
        throw new Error("Failed to fetch OFX rate");
      }

      // Return rates in descending order
      const rates = [
        { source: "XE", rate: xeRate },
        { source: "OFX", rate: ofxRate },
      ];

      rates.sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));

      console.log(rates);
      return rates;
    }),
});
