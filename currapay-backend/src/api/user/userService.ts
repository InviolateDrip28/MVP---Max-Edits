import { PrismaClient, User } from '@prisma/client';

export class UserService {
  private prisma = new PrismaClient();

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
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
    return this.prisma.user.create({
      data,
    });
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
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
