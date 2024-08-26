import prisma from '../../db/prismaClient'; 


export const useTransaction = {
  getAllTransactions: async () => {
    try {
      console.log("Fetching all transactions...");
      return await prisma.transaction.findMany();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw new Error("Failed to fetch transactions");
    }
  },

  getTransactionById: async (id: number) => {
    try {
      console.log(`Fetching transaction with ID: ${id}`);
      return await prisma.transaction.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error fetching transaction with ID ${id}:`, error);
      throw new Error(`Failed to fetch transaction with ID ${id}`);
    }
  },

  createTransaction: async (transactionData: {
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
  }) => {
    try {
      return await prisma.transaction.create({ data: transactionData });
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw new Error("Failed to create transaction");
    }
  },

  updateTransaction: async (id: number, data: {
    userId?: number;
    amount?: number;
    currency?: string;
    exchangeRate?: number;
    fees?: number;
    processingTime?: number;
    transferMethod?: string;
    purposeOfTransfer?: string;
    status?: string;
    timestamp?: Date;
  }) => {
    try {
      return await prisma.transaction.update({ where: { id }, data });
    } catch (error) {
      console.error(`Error updating transaction with ID ${id}:`, error);
      throw new Error(`Failed to update transaction with ID ${id}`);
    }
  },

  deleteTransaction: async (id: number) => {
    try {
      await prisma.transaction.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error(`Error deleting transaction with ID ${id}:`, error);
      return false;
    }
  },
};