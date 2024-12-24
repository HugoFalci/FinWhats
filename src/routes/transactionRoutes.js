import express from 'express';
import Transaction from '../models/transactionModel.js';

const transactionRouter = express.Router();

transactionRouter.get('/', async (req, res) => {
    try{
        const transactions = await Transaction.find();
        console.log('Rota de busca de transações');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default transactionRouter;