import { PrismaClient, Transaction } from '@prisma/client';

export class TransactionService {
  private prisma = new PrismaClient();

  async getAllTransactions(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
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
    return this.prisma.transaction.create({
      data,
    });
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
    return this.prisma.transaction.update({
      where: { id },
      data,
    });
  }

  async deleteTransaction(id: number): Promise<boolean> {
    try {
      await this.prisma.transaction.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
