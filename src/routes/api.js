import express from 'express';
import userRoutes from './userRoutes.js';
import transactionRoutes from './transactionRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

export default app;