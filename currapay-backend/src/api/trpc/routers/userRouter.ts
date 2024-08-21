import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { UserService } from '../../user/userService'; 

const userService = new UserService();
const t = initTRPC.create();

export const userRouter = t.router({
  getAllUsers: t.procedure
    .query(async () => {
      return await userService.getAllUsers();
    }),
  
  getUserById: t.procedure
    .input(z.number())
    .query(async ({ input }) => {
      return await userService.getUserById(input);
    }),
  
  createUser: t.procedure
    .input(z.object({
      emailAddress: z.string().email(),
      country: z.string(),
      city: z.string(),
      age: z.number().int().positive(),
      gender: z.string(),
      occupation: z.string(),
      nationality: z.string(),
      deviceUsed: z.string(),
      internetAccess: z.boolean(),
      mobilePenetration: z.number().nonnegative(),
      accountCreationDate: z.date(),
    }))
    .mutation(async ({ input }) => {
      return await userService.createUser(input);
    }),
  
  updateUser: t.procedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        emailAddress: z.string().email().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
        age: z.number().int().positive().optional(),
        gender: z.string().optional(),
        occupation: z.string().optional(),
        nationality: z.string().optional(),
        deviceUsed: z.string().optional(),
        internetAccess: z.boolean().optional(),
        mobilePenetration: z.number().nonnegative().optional(),
        accountCreationDate: z.date().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      return await userService.updateUser(input.id, input.data);
    }),
  
  deleteUser: t.procedure
    .input(z.number())
    .mutation(async ({ input }) => {
      return await userService.deleteUser(input);
    }),
});
