import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import axios from 'axios';

const t = initTRPC.create();

export const currencySolutionsRouter = t.router({
    getCurrencySolutions: t.procedure.query(async () => {
        try {
            const response = await axios.get(process.env.CS_URL!, {
                headers: {
                    'x-api-key': process.env.CS_KEY!,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error occured: ${error.messsage}');
        }
    }),
});