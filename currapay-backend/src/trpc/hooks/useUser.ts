import { initTRPC } from "@trpc/server";
import { z } from "zod";
import prisma from "../../db/prismaClient";
import argon2 from "argon2";

const t = initTRPC.create();

const userCreateSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6),
  country: z.string(),
  city: z.string(),
  age: z.number().int(),
  gender: z.string(),
  occupation: z.string(),
  nationality: z.string(),
  deviceUsed: z.string(),
  browserUsed: z.string(),
});

const userUpdateSchema = z.object({
  emailAddress: z.string().email().optional(),
  password: z.string().min(6).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  age: z.number().int().optional(),
  gender: z.string().optional(),
  occupation: z.string().optional(),
  nationality: z.string().optional(),
  deviceUsed: z.string().optional(),
  browserUsed: z.string().optional(),
});

const userIdSchema = z.number();
const userEmailSchema = z.string().email();

export const useUser = t.router({
  getAllUsers: t.procedure.query(async () => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }),

  getUserById: t.procedure.input(userIdSchema).query(async (opts) => {
    const { input: id } = opts;
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new Error(`Failed to fetch user with ID ${id}`);
    }
  }),

  getUserByEmail: t.procedure.input(userEmailSchema).query(async (opts) => {
    const { input: email } = opts;
    try {
      return await prisma.user.findUnique({ where: { emailAddress: email } });
    } catch (error) {
      console.error("Error fetching user with email ${email}:", error);
      throw new Error("Failed to fetch user with email ${email}");
    }
  }),

  createUser: t.procedure.input(userCreateSchema).mutation(async (opts) => {
    const { input: userData } = opts;
    try {
      const hashedPassword = await argon2.hash(userData.password);

      return await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }),

  updateUser: t.procedure
    .input(
      z.object({
        id: z.number(),
        data: userUpdateSchema,
      })
    )
    .mutation(async (opts) => {
      const { id, data } = opts.input;
      try {
        const updateData: any = { ...data, updatedAt: new Date() };

        if (data.password) {
          updateData.password = await argon2.hash(data.password);
        }

        return await prisma.user.update({ where: { id }, data: updateData });
      } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw new Error(`Failed to update user with ID ${id}`);
      }
    }),

  deleteUser: t.procedure.input(userIdSchema).mutation(async (opts) => {
    const { input: id } = opts;
    try {
      await prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      return false;
    }
  }),
});
