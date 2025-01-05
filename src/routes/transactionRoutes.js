import express from 'express';
import { 
    getTransactions, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction 
} from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.delete('/:id', deleteTransaction);
transactionRouter.put('/:id', updateTransaction);
transactionRouter.get('/', getTransactions);
transactionRouter.post('/', createTransaction);

export default transactionRouter;