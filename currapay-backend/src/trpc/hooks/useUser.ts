import prisma from '../../db/prismaClient';
import argon2 from 'argon2';

export const useUser = {
  getAllUsers: async () => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  },

  getUserById: async (id: number) => {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new Error(`Failed to fetch user with ID ${id}`);
    }
  },

  createUser: async (userData: {
    emailAddress: string;
    password: string; 
    country: string;
    city: string;
    age: number;
    gender: string;
    occupation: string;
    nationality: string;
    deviceUsed: string;
    browserUsed: string;
  }) => {
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
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  },

  updateUser: async (id: number, data: {
    emailAddress?: string;
    password?: string;
    country?: string;
    city?: string;
    age?: number;
    gender?: string;
    occupation?: string;
    nationality?: string;
    deviceUsed?: string;
    browserUsed?: string; 
  }) => {
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
  },

  deleteUser: async (id: number) => {
    try {
      await prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      return false;
    }
  },
};
