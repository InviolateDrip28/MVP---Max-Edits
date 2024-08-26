import prisma from '../../db/prismaClient'; 


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
    country: string;
    city: string;
    age: number;
    gender: string;
    occupation: string;
    nationality: string;
    deviceUsed: string;
    internetAccess: boolean;
    mobilePenetration: number;
    accountCreationDate: Date;
  }) => {
    try {
      return await prisma.user.create({ data: userData });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  },

  updateUser: async (id: number, data: {
    emailAddress?: string;
    country?: string;
    city?: string;
    age?: number;
    gender?: string;
    occupation?: string;
    nationality?: string;
    deviceUsed?: string;
    internetAccess?: boolean;
    mobilePenetration?: number;
    accountCreationDate?: Date;
  }) => {
    try {
      return await prisma.user.update({ where: { id }, data });
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
