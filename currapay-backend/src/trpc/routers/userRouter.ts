// @ts-nocheck
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { useUser } from '../hooks/useUser';

const t = initTRPC.create();

export const userRouter = t.router({
  getAllUsers: t.procedure.query(async () => {
    return await useUser.getAllUsers();
  }),

  getUserById: t.procedure
    .input(z.number())
    .query(async ({ input }) => {
      return await useUser.getUserById(input);
    }),

  createUser: t.procedure
    .input(z.object({
      firstName: z.string(),
      lastName: z.string(),
      emailAddress: z.string().email(),
      password: z.string().min(6), 
      country: z.string(),
      city: z.string(),
      age: z.number().int().positive(),
      gender: z.string(),
      occupation: z.string(),
      nationality: z.string(),
      deviceUsed: z.string(),
      browserUsed: z.string(), 
      recieveEmails: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      return await useUser.createUser(input);
    }),

  updateUser: t.procedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        emailAddress: z.string().email().optional(),
        password: z.string().min(6).optional(), 
        country: z.string().optional(),
        city: z.string().optional(),
        age: z.number().int().positive().optional(),
        gender: z.string().optional(),
        occupation: z.string().optional(),
        nationality: z.string().optional(),
        deviceUsed: z.string().optional(),
        browserUsed: z.string().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      return await useUser.updateUser(input.id, input.data);
    }),

  deleteUser: t.procedure
    .input(z.number())
    .mutation(async ({ input }) => {
      return await useUser.deleteUser(input);
    }),
  
  getUserByEmail: t.procedure
    .input(z.string().email())
    .query(async ({ input }) => {
      return await useUser.getUserByEmail(input);
    }),
});
