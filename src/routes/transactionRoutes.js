import express from 'express';
import { getTransactions, createTransaction } from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.get('/', getTransactions);
transactionRouter.post('/', createTransaction);

export default transactionRouter; 