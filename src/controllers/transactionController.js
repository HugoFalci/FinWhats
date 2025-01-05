import Transaction from '../models/transactionModel.js';
import Installment from '../models/installmentsModel.js';
import { deleteTransactionInstallments } from './installmentsController.js';

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
            description,
            paidInstallments
        } = req.body;

        if (!userId || !type || !amount || !category) {
            return res.status(400).json({ message: "Todos os campos obrigatórios precisam ser preenchidos." });
        }

        if (type === 'credit' && (!installments || installments <= 0)) {
            return res.status(400).json({ message: "Transações em crédito precisam ter 1 parcela ou mais." });
        }

        if (type === 'credit' && (paidInstallments > installments)) {
            return res.status(400).json({ message: "Parcelas pagas não podem ser maiores que o total de parcelas." });
        }

        const transaction = new Transaction({
            userId,
            type,
            amount,
            category,
            description,
            installments: type === 'credit' ? installments : 1
        });

        await transaction.save();
        console.log("Transação criada: ", transaction);

        if (type === 'credit') {
            const installmentAmount = parseFloat((amount / installments).toFixed(2));
            const start = new Date();
            const installmentData = [];

            for (let i = 0; i < installments; i++) {
                const dueDate = new Date(start);
                dueDate.setMonth(start.getMonth() + i);

                installmentData.push({
                    transactionId: transaction._id,
                    installmentNumber: i + 1,
                    dueDate: dueDate.getTime(),
                    amount: installmentAmount,
                    status: i < paidInstallments ? 'paid' : 'pending'
                });
            }

            await Installment.insertMany(installmentData);
            console.log('Parcelas criadas:', installmentData);
        }

        res.status(201).json(transaction);
    } catch (error) {
        console.error("Erro ao criar a transação", error.message);
        res.status(500).json({ message: "Erro ao criar transação." });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const transaction = await Transaction.findByIdAndUpdate(id, updates, { new: true });
        if (!transaction) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }

        console.log('Transação atualizado:', transaction);
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Erro ao atualizar a transação:', error.message);
        res.status(500).json({ message: 'Erro ao atualizar a transação.' });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);
        
        if (!transaction) {
            return res.status(404).json({ message: 'Transação não encontrado.' });
        }

        const installments = await deleteTransactionInstallments(id);

        if (!installments.success && installments.message === 'Nenhuma parcela encontrada para essa transação.') {
            console.log('Nenhuma parcela associada à transação.');
        } else if (!installments.success) {
            return res.status(500).json({ message: installments.message });
        }

        console.log('Transação deletada:', transaction);
        res.status(200).json({ message: 'Transação deletada com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar a transação:', error.message);
        res.status(500).json({ message: 'Erro ao deletar a transação.' });
    }
};