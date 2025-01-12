// @ts-nocheck

const dotenv = require("dotenv");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const cron = require("node-cron");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });


// Update the rates table data every hour
// rates for these currencies => ["USD", "GBP", "EUR", "CAD", "CHF", "AUD", "BRL", "JPY"];
// RUB is not tradeable
// INR is tradeable only between 07:00 to 17:30 NZST
// sell currency cannot equal the currency of buy

async function updateRatesTable() {
  console.log("Updating rates table data...");
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

    // console.log("XE Rates Table:", resultArr);
    console.log("XE Rates Table generated.");

    fs.writeFile(
      "./data/rates.json",
      JSON.stringify(resultArr, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to rates file:", err);
        } else {
          console.log("Rates table data updated successfully.");
        }
      }
    );
  ;
}

// Schedule the update every hour
cron.schedule("0 * * * *", () => {
  updateRatesTable();
});
