import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['debit', 'credit', 'investiment', 'pix'],
        required: true
    },
    amount: { type: Number, required: true },
    installments: { type: Number, default: 1},
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, default: "" }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;