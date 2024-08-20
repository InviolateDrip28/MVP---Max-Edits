import { PrismaClient, Transaction } from '@prisma/client';
import prisma from '../../db/prismaClient'; 

export class TransactionService {
  async getAllTransactions(): Promise<Transaction[]> {
    try {
      console.log("Fetching all transactions...");
      return await prisma.transaction.findMany();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw new Error("Failed to fetch transactions");
    }
  }


  async getTransactionById(id: number): Promise<Transaction | null> {
    try {
      console.log(`Fetching transaction with ID: ${id}`);
      return await prisma.transaction.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(`Error fetching transaction with ID ${id}:`, error);
      throw new Error(`Failed to fetch transaction with ID ${id}`);
    }
  }


  async createTransaction(data: {
    userId: number;
    amount: number;
    currency: string;
    exchangeRate: number;
    fees: number;
    processingTime: number;
    transferMethod: string;
    purposeOfTransfer: string;
    status: string;
    timestamp: Date;
  }): Promise<Transaction> {
    try {
      return await prisma.transaction.create({
        data,
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw new Error("Failed to create transaction");
    }
  }


  async updateTransaction(id: number, data: Partial<{
    userId: number;
    amount: number;
    currency: string;
    exchangeRate: number;
    fees: number;
    processingTime: number;
    transferMethod: string;
    purposeOfTransfer: string;
    status: string;
    timestamp: Date;
  }>): Promise<Transaction | null> {
    try {
      return await prisma.transaction.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Error updating transaction with ID ${id}:`, error);
      throw new Error(`Failed to update transaction with ID ${id}`);
    }
  }


  async deleteTransaction(id: number): Promise<boolean> {
    try {
      await prisma.transaction.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(`Error deleting transaction with ID ${id}:`, error);
      return false;
    }
  }
}
