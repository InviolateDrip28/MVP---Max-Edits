import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios from "axios";

const t = initTRPC.create();

export const allRatesRouter = t.router({
  getRankedRates: t.procedure
    .input(
      z.object({
        // currency of sell
        sell: z.string().length(3),
        // currency of buy
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
        xeRate = parseFloat(Number(xeRate).toFixed(3));
        console.log("XE rate:", xeRate);
      } catch (error) {
        console.error("Error fetching XE rate:", error);
        xeRate = null;
        // throw new Error("Failed to fetch XE rate");
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

        amRate = response.data.payload?.quote?.rate || null;
        amRate = parseFloat(Number(amRate).toFixed(3));
        console.log("Atlantic Money Rate:", amRate);
      } catch (error) {
        console.error("Error fetching Atlantic Money rate:", error);
        amRate = null;
        // throw new Error("Failed to fetch Atlantic Money rate");
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
        csRate = parseFloat(Number(csRate).toFixed(3));
        console.log("Currency Solution Rate:", csRate);
      } catch (error) {
        console.error("Error fetching Currency Solution rate:", error);
        // throw new Error("Failed to fetch Currency Solution  rate");
        csRate = null;
      }
      
      // Get Remitly Rate
      let reRate: number | null = null;
      try {
        const request = {
          origination: {
            country,
            currency: sell,
            sendAmount: amount,
          },
          destination: {
            country: destinationCountry,
            currency: buy,
          },
        };

        const response = await axios.post(
          `${process.env.RE_URL}/v1/price`,
          request,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.RE_KEY!,
            },
          }
        );

        reRate = response.data.products[0]?.exchangeRate;
        reRate = parseFloat(Number(reRate).toFixed(3));
        console.log("Remitly Rate:", reRate);
      } catch (error) {
        console.error("Error fetching Remitly rate:", error);
        // throw new Error("Failed to fetch Remitly rate");
        reRate = null;
      }
      
      // Get Ria Rate
      let riaRate: number | null = null;
      try {
        const requestBody = {
          "selections": {
            "countryTo": destinationCountry,
            "currencyTo": buy,
            "currencyFrom": sell,
            "paymentMethod": "DebitCard", // You might need to make this dynamic based on user input
            "deliveryMethod": "MobilePayment", // You might need to make this dynamic
            "amountFrom": amount.toString(),
            "amountTo": null,
            "agentToId": null,
            "agentToLocationId": null,
            "shouldCalcVariableRates": true
          }
        };

        const response = await axios.post(
          'https://public.riamoneytransfer.com/moneytransfercalculator/calculate',
          requestBody,
          {
            headers: {
              'appversion': '4.51.0',
              'isocode': country, // Using the 'country' from the input as 'isocode'
              'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0',
              'Content-Type': 'application/json'
            }
          }
        );

        const riaCalculations = response.data?.model?.transferDetails?.calculations;
        riaRate = riaCalculations?.exchangeRate || null;
        riaRate = parseFloat(Number(riaRate).toFixed(3));
        console.log("Ria Rate:", riaRate);
      } catch (error) {
        console.error("Error fetching Ria rate:", error);
        riaRate = null;
        // throw new Error("Failed to fetch Ria rate");
      }

      // Get Western Union Rate
      let wuRate: number | null = null;
      try {
        const request = {
          origination: {
            country,
            currency: sell,
            sendAmount: amount,
          },
          destination: {
            country: destinationCountry,
            currency: buy,
          },
        };

        const response = await axios.post(
          `${process.env.WU_URL}/wuconnect/prices/products`,
          request,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.WU_KEY!,
            },
          }
        );

        wuRate = response.data.products[0]?.exchangeRate;
        wuRate = parseFloat(Number(wuRate).toFixed(3));
        console.log("Western Union Rate:", wuRate);
      } catch (error) {
        console.error("Error fetching Western Union rate:", error);
        // throw new Error("Failed to fetch Western Union rate");
        wuRate = null;
      }

      // Return rates in descending order
      const rates = [
        { source: "XE", rate: xeRate },
        // { source: "OFX", rate: ofxRate },
        { source: "Atlantic Money", rate: amRate },
        { source: "Remitly", rate: reRate },
        { source: "OFX", rate: ofxRate },
        { source: "Ria", rate: riaRate },
        { source: "Currency Solution", rate: csRate },
        { source: "Western Union", rate: wuRate },
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
