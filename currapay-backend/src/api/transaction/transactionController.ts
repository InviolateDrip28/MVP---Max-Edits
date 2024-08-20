import { Request, Response } from 'express';
import { TransactionService } from './transactionService';

const transactionService = new TransactionService();

export class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      console.log("Handling getAllTransactions request...");
      const transactions = await transactionService.getAllTransactions();
      console.log("Transactions fetched:", transactions);
      res.json(transactions);
    } catch (error) {
      console.error("Error in getAllTransactions:", error);
      res.status(500).json({ error: 'An error occurred while fetching transactions' });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const transactionId = parseInt(req.params.id);
    try {
      const transaction = await transactionService.getTransactionById(transactionId);
      if (transaction) {
        res.json(transaction);
      } else {
        res.status(404).json({ error: 'Transaction not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the transaction' });
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const transaction = await transactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the transaction' });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const transactionId = parseInt(req.params.id);
    try {
      const transaction = await transactionService.updateTransaction(transactionId, req.body);
      if (transaction) {
        res.json(transaction);
      } else {
        res.status(404).json({ error: 'Transaction not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the transaction' });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const transactionId = parseInt(req.params.id);
    try {
      const deleted = await transactionService.deleteTransaction(transactionId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Transaction not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the transaction' });
    }
  }
}
