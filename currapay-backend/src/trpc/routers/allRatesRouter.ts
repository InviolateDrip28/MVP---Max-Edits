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
      // let ofxRate: number | null = null;
      // try {
      //   const response = await axios.get(
      //     `${process.env.OFX_URL}/ofxrates/${sell}/${buy}/${amount}`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${process.env.OFX_TOKEN}`,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      //   ofxRate = response.data.ofxRate || null;
      //   console.log("OFX Rate:", ofxRate);
      // } catch (error) {
      //   console.error("Error fetching OFX rate:", error);
      //   throw new Error("Failed to fetch OFX rate");
      // }

      // Get Atlantic Money Rate
      let amRate: number | null = null;
      try {
        const response = await axios.get(
          `${process.env.AM_URL}/transfer/public/v1/estimate`,
          {
            params: {
              amount: amount,
              destinationCurrencyCode: buy,
              entryMode: "source",

              sourceCurrencyCode: sell,
            },
          }
        );

        const amRate = response.data.payload?.quote?.rate || null;
        console.log("Atlantic Money Rate:", amRate);
      } catch (error) {
        console.error("Error fetching Atlantic Money rate:", error);
        throw new Error("Failed to fetch Atlantic Money rate");
      }

      // Get Currency Solutions Rate
      let csRate: number | null = null;
      try {
        const response = await axios.get(
          `${process.env.CS_URL}/${sell}${buy}`,
          {
            headers: {
              "x-api-key": process.env.CS_KEY!,
            },
          }
        );

        csRate = response.data.data.offer || null;
        console.log("Currency Solution Rate:", csRate);
      } catch (error) {
        console.error("Error fetching Currency Solution rate:", error);
        throw new Error("Failed to fetch Currency Solution  rate");
      }

      // Return rates in descending order
      const rates = [
        { source: "XE", rate: xeRate },
        // { source: "OFX", rate: ofxRate },
        { source: "Atlantic Money", rate: amRate },
        { source: "Currency Solution", rate: csRate },
      ];

      rates.sort((a, b) => {
        if (a.rate === null && b.rate === null) return 0;
        if (a.rate === null) return 1;
        if (b.rate === null) return -1;
        return b.rate - a.rate;
      });

      console.log(rates);
      return rates;
    }),
});
