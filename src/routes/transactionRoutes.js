import express from 'express';
import { 
    getTransactions, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction 
} from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.get('/', getTransactions);
transactionRouter.post('/', createTransaction);
transactionRouter.put('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction);

export default transactionRouter;