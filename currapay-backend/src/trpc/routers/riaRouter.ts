import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios from "axios";

const t = initTRPC.create();

// Define the input schema for the Ria rate request
const riaRateInputSchema = z.object({
  countryTo: z.string().length(2),
  currencyTo: z.string().length(3),
  currencyFrom: z.string().length(3),
  paymentMethod: z.enum(["BankAccount", "CreditCard", "DebitCard", "PayNearMe", "StagedRia"]),
  deliveryMethod: z.enum(["OfficePickup", "BankDeposit", "MobilePayment"]),
  amountFrom: z.number().positive(),
});

// Define the output schema based on the Response Example (simplified for relevant data)
const riaRateOutputSchema = z.object({
  amountTo: z.number().nullable(),
  exchangeRate: z.number().nullable(),
  totalFeesAndTaxes: z.number().nullable(),
  totalAmount: z.number().nullable(),
  isBestRate: z.boolean().nullable(),
  variableRates: z.array(
    z.object({
      value: z.string(),
      exchangeRate: z.number().nullable(),
      payAgentName: z.string().nullable(),
      payAgentId: z.number().nullable(),
      isBestRate: z.boolean().nullable(),
    })
  ),
});

export const riaMoneyTransferRouter = t.router({
  getRiaRate: t.procedure
    .input(riaRateInputSchema)
    .query(async (opts) => {
      const { countryTo, currencyTo, currencyFrom, paymentMethod, deliveryMethod, amountFrom } = opts.input;
      try {
        const requestBody = {
          "selections": {
            "countryTo": countryTo,
            "currencyTo": currencyTo,
            "currencyFrom": currencyFrom,
            "paymentMethod": paymentMethod,
            "deliveryMethod": deliveryMethod,
            "amountFrom": amountFrom.toString(), // API expects amountFrom as a string
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
              'isocode': 'US',
              'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0',
              'Content-Type': 'application/json'
            }
          }
        );

        const riaRateData = response.data.model.transferDetails.calculations;
        console.log("Ria API Response:", riaRateData);
        return riaRateData as z.infer<typeof riaRateOutputSchema>;
      } catch (error) {
        console.error("Error fetching Ria rate:", error);
        throw new Error("Failed to fetch Ria rate");
      }
    }),
});

// Example usage (within a tRPC context):
// const riaRate = await riaMoneyTransferRouter.getRiaRate.query({
//   countryTo: "PK",
//   currencyTo: "PKR",
//   currencyFrom: "USD",
//   paymentMethod: "CreditCard",
//   deliveryMethod: "OfficePickup",
//   amountFrom: 100,
// });
// console.log(riaRate);
