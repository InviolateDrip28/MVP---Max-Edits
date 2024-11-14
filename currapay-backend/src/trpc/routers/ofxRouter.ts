import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios from "axios";
import * as crypto from "crypto";

const t = initTRPC.create();

export const ofxRouter = t.router({
  //to get a single rate
  getOfxRate: t.procedure
    .input(
      z.object({
        sell: z.string().length(3),
        buy: z.string().length(3),
        amount: z.number().positive(),
      })
    )
    .query(async (opts) => {
      const { sell, buy, amount } = opts.input;
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

        const { ofxRate } = response.data;
        console.log("OFX Rate:", ofxRate);
        return ofxRate;
      } catch (error) {
        console.error("Error fetching OFX rate:", error);
        throw new Error("Failed to fetch OFX rate");
      }
    }),
});
