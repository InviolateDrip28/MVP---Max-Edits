import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import axios from 'axios';
import * as crypto from 'crypto';

const t = initTRPC.create();

export const xeRouter = t.router({
    getXeRate: t.procedure
        .input(z.object({
            sell: z.string().length(3),
            buy: z.string().length(3),
            amount: z.number().positive(),
            country: z.string().length(2),
            destinationCountry: z.string().length(2),
            fixed_currency: z.enum(['sell', 'buy'])
        }))
        .query(async (opts) => {
            const { sell, buy, amount, country, destinationCountry, fixed_currency } = opts.input;

            try {
                const authHeader = `Basic ${Buffer.from(`${process.env.XE_ID}:${process.env.XE_KEY}`).toString('base64')}`;

                const response = await axios.get(`${process.env.XE_URL}/v2/tradeable_rate`, {
                    headers: {
                        'Authorization': authHeader,
                    },
                    params: {
                        sell,
                        buy,
                        amount,
                        country,
                        destinationCountry,
                        fixed_currency,
                    },
                });

                console.log('XE API response:', response.data);

                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error fetching XE rate:', error.response?.data);
                    throw new Error(`XE API error: ${error.response?.data?.message || error.message}`);
                } else {
                    console.error('Unexpected error:', error);
                    throw new Error(`Error occurred: ${error}`);
                }
            }
        }),
});