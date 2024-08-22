import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import prisma from '../../db/prismaClient'; // Import the Prisma client

const t = initTRPC.create();

export const userRouter = t.router({
  getAllUsers: t.procedure
    .query(async () => {
      try {
        return await prisma.user.findMany();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    }),
  
  getUserById: t.procedure
    .input(z.number())
    .query(async ({ input }) => {
      try {
        return await prisma.user.findUnique({
          where: { id: input },
        });
      } catch (error) {
        console.error(`Error fetching user with ID ${input}:`, error);
        throw new Error(`Failed to fetch user with ID ${input}`);
      }
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
      try {
        return await prisma.user.create({
          data: input,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
      }
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
      try {
        return await prisma.user.update({
          where: { id: input.id },
          data: input.data,
        });
      } catch (error) {
        console.error(`Error updating user with ID ${input.id}:`, error);
        throw new Error(`Failed to update user with ID ${input.id}`);
      }
    }),
  
  deleteUser: t.procedure
    .input(z.number())
    .mutation(async ({ input }) => {
      try {
        await prisma.user.delete({
          where: { id: input },
        });
        return true;
      } catch (error) {
        console.error(`Error deleting user with ID ${input}:`, error);
        return false;
      }
    }),
});
