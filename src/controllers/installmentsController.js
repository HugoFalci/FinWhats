import Installment from '../models/installmentsModel.js';

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
}