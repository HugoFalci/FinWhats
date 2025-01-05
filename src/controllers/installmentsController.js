import Installment from '../models/installmentsModel.js';

export const getInstallments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 100;
        const installment = await Installment.find().skip(page * limit).limit(limit);

        console.log('Rota de busca de parcelas');
        
        res.status(200).json(installment);
    } catch (error) {
        console.error("Erro ao buscar parcelas", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const createInstallments = async (transaction) => {
    try {
        const { _id: transactionId, amount, installments} = transaction;
        const installmentAmount = amount / installments;
        const today = new Date();
        const installmentsToSave = [];

        for (let i = 1; i <= installments; i++) {
            const dueDate = new Date(today);

            dueDate.setMonth(today.getMonth() + i);

            const installment = new Installment({
                transactionId,
                installmentNumber: i,
                dueDate: dueDate,
                amount: installmentAmount
            });

            installmentsToSave.push(installment);
        };

        await Installment.insertMany(installmentsToSave);

        console.log("Parcelas criadas com sucesso: ", installmentsToSave);
        return { success: true, installments: installmentsToSave };
    } catch (error) {
        console.error("Erro ao criar parcelas: ", error.message);
        return { success: false, message: error.message };
    }
};

export const updateInstallments = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const installment = await Installment.findByIdAndUpdate(id, updates, { new: true });
        if (!installment) {
            return res.status(404).json({ message: 'Parcela não encontrada.' });
        }

        console.log('Parcela atualizada:', installment);
        res.status(200).json(installment);
    } catch (error) {
        console.error('Erro ao atualizar a parcela:', error.message);
        res.status(500).json({ message: 'Erro ao atualizar a parcela.' });
    }
};

export const deleteInstallments = async (req, res) => {
    try {
        const { id } = req.params;
        const installment = await Installment.findByIdAndDelete(id);
        
        if (!installment) {
            return res.status(404).json({ message: 'Parcela não encontrada.' });
        }

        console.log('Parcela deletada:', installment);
        res.status(200).json({ message: 'Parcela deletada com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar a parcela:', error.message);
        res.status(500).json({ message: 'Erro ao deletar a parcela.' });
    }
};

export const deleteTransactionInstallments = async (req, res) => {
    try {
        const { id } = req.params;
        const installment = await Installment.deleteMany({ transactionId: id });
        
        if (installment.deletedCount === 0) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }

        console.log('Parcela deletada:', installment);
        console.log('Transação das parcelas deletada:', installment);
        res.status(200).json({ message: 'Parcelas da transação deletadas com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar as parcelas da transação:', error.message);
        res.status(500).json({ message: 'Erro ao deletar as parcelas da transação.' });
    }
};