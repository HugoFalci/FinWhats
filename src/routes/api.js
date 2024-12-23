import express from 'express';
import userRoutes from './userRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

export default app;