import mongoose from "mongoose";

const installmentSchema = new mongoose.Schema({
    transactionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    installmentNumber:  { type: Number, required: true },
    dueDate:            { type: Number, required: true },
    amount:             { type: Number, required: true },
    status: {  
        type: String,
        enum: ['pending', 'paid', 'overdue'],
        default: 'pending'
    }
});

const Installment = mongoose.model('Installment', installmentSchema);

export default Installment; 