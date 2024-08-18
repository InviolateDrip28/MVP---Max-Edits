import { Router } from 'express';
import { TransactionController } from '../transaction/transactionController';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get('/', transactionController.getAllTransactions.bind(transactionController));
transactionRouter.get('/:id', transactionController.getTransactionById.bind(transactionController));
transactionRouter.post('/', transactionController.createTransaction.bind(transactionController));
transactionRouter.put('/:id', transactionController.updateTransaction.bind(transactionController));
transactionRouter.delete('/:id', transactionController.deleteTransaction.bind(transactionController));

export default transactionRouter;
