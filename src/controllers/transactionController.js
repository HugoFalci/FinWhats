import Transaction from '../models/transactionModel.js';
import { createInstallments } from './installmentsController.js';

export const getTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 100;
        const transactions = await Transaction.find().skip(page * limit).limit(limit);

        console.log('Rota de busca de transações');
        
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Erro ao buscar transações", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const createTransaction = async (req, res) => {
    try {
        const { 
            userId,
            type,
            amount,
            installments,
            category,
            discription
        } = req.body;

        if (!userId || !type || !amount || !category) {
            return res.status(400).json({ message: "Todos os campos obrigatórios precisam ser preenchidos" });
        }

        if (type === 'credit' && (!installments || installments <= 0)) {
            return res.status(400).json({ message: "Transações em crédito precisam ter 1 parcela ou mais" });
        }

        const transaction = new Transaction({
            userId,
            type,
            amount,
            category,
            discription,
            installments: type === 'credit' ? installments : 1
        });

        await transaction.save();
        console.log("Transação criada: ", transaction);

        if (type === 'credit') {
            const result = await createInstallments(transaction);
            
            if (!result.success) {
                return res.status(500).json({ message: result.message });
            }
        }

        res.status(201).json(transaction);
    } catch (error) {
        console.error("Erro ao criar a transação", error.message);
        res.status(500).json({ message: "Erro ao criar transação." });
    }
};
