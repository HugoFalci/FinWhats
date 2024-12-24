import Transaction from '../models/transactionModel.js';

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
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
            category,
            discription, 
            installments
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
        console.log("Transação criada!", transaction);
        res.status(201).json(transaction);
    } catch (error) {
        console.error("Erro ao criar a transação", error.message);
        res.status(500).json({ message: "Erro ao criar transação." });
    }
};
