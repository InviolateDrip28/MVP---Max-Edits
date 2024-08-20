import { User } from '@prisma/client'; 
import prisma from '../../db/prismaClient';

export class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }


  async getUserById(id: number): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new Error(`Failed to fetch user with ID ${id}`);
    }
  }


  async createUser(data: {
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
  }): Promise<User> {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }


  async updateUser(id: number, data: Partial<{
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
  }>): Promise<User | null> {
    try {
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new Error(`Failed to update user with ID ${id}`);
    }
  }


  async deleteUser(id: number): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      return false;
    }
  }
}
