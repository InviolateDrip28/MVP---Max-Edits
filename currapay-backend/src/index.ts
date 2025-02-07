// @ts-nocheck
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { appRouter } from "./trpc/_app";
import * as trpcExpress from "@trpc/server/adapters/express";
import { errorHandler } from "./utils/errorHandler";
import { logger } from "./utils/logger";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Initialize the Express application
const app = express();

// CORS setup
// Allow requests from any origin
app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
  logger(`Received ${req.method} request for ${req.url}`);
  next();
});

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Currapay's Server");
});

// tRPC setup
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// jobs: update the rates table data every hour
const axios = require("axios");
const fs = require("fs");
const cron = require("node-cron");

// rates for these currencies => ["USD", "GBP", "EUR", "CAD", "CHF", "AUD", "BRL", "JPY"];
// RUB is not tradeable
// INR is tradeable only between 07:00 to 17:30 NZST
// sell currency cannot equal the currency of buy
async function updateRatesTable() {
  const currencies = [
    "USD",
    "GBP",
    "EUR",
    "CAD",
    "CHF",
    "AUD",
    "BRL",
    "JPY",
  ];

  const currencyToCountryCode = {
    USD: "US",
    GBP: "GB",
    EUR: "FR", // use the country code for France for the euro currency
    CAD: "CA",
    CHF: "CH",
    AUD: "AU",
    BRL: "BR",
    JPY: "JP",
  };

  let resultArr = [];

  for (const sell of currencies) {
    const tmpArr = [];


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

  const filepath = path.join(__dirname, "/trpc/data/rates.json");
  fs.writeFile(
    filepath,
    JSON.stringify(resultArr, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing rates data:", err);
      }
    }
  );
}

// Schedule the update every hour
cron.schedule("0 * * * *", () => {
  updateRatesTable();
});
