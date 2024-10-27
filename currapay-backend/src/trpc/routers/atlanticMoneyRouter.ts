import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import axios from 'axios';

const t = initTRPC.create();

export const atlanticMoneyRouter = t.router({
    // Endpoint for which countries are supported
    // {
    //   "status": "Ok",
    //   "time": "2022-07-11T08:01:07.446Z",
    //   "traceId": "string",
    //   "payload": {
    //     "countries": [
    //       {
    //         "countryCode": "string" ("GB", "BE", etc.)
    //       }
    //     ]
    //   }
    // }
    getSupportedCountries: t.procedure.query(async () => {
        try {
            const response = await axios.get('${process.env.AM_URL}/transfer/public/v1/country/list', {});
            return response.data;
        } catch (error) {
            throw new Error('Error occured: ${error.messsage}');
        }
    }),

    // endpoint for which currencies are supported
    // {
    //   "status": "Ok",
    //   "time": "2022-07-11T08:03:36.678Z",
    //   "traceId": "string",
    //   "payload": {
    //     "sourceCurrencies": [
    //       {
    //         "code": "GBP",
    //         "minIncrement": "0.01"
    //       }
    //     ],
    //     "destinationCurrencies": [
    //       {
    //         "code": "EUR",
    //         "minIncrement": "0.01"
    //       }
    //     ]
    //   }
    // }
    getSupportedCurrencies: t.procedure.query(async () => {
        try {
            const response = await axios.get('${process.env.AM_URL}/transfer/public/v1/available-currency/list', {});
            return response.data;
        } catch (error) {
            throw new Error('Error occured: ${error.messsage}');
        }
    }),

    // endpoint for transfer estimates
    // {
    //    "status": "Ok",
    //    "time": "2022-07-11T08:07:56.076Z",
    //    "traceId": "string"
    //    "payload": {
    //      "destinationMoney": {
    //        "currency": {
    //          "code": "GBP",
    //          "minIncrement": "0.01"
    //         },
    //         "amount": "string" (example: "1000", "1873.29")
    //      },
    //      "sourceMoney": {
    //        "currency": {
    //          "code": "GBP",
    //          "minIncrement": "0.01"
    //         },
    //         "amount": "string"
    //      },
    //      "totalFee": {
    //        "currency": {
    //          "code": "GBP",
    //          "minIncrement": "0.01"
    //         },
    //         "amount": "string"
    //       },
    //       "quote": {
    //         "type": "frozen",
    //         "rate": "1.11",
    //         "expiresAt": "2022-07-11T08:07:56.076Z"
    //       },
    //      "entryMode": "enum" ("source" or "destination")
    //      "deliveryDate": "2022-07-11T08:07:56.076Z"
    //    }
    // }
    getTransferEstimate: t.procedure.query(async () => {
        try {
            const response = await axios.get('${process.env.AM_URL}/transfer/public/v1/estimate', {});
            return response.data;
        } catch (error) {
            throw new Error('Error occured: ${error.messsage}');
        }
    }),
});