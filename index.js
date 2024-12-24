import dotenv from 'dotenv';
import app from './src/routes/api.js';
import connectDB from './src/config/database.js';

dotenv.config();
connectDB();

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Servidor ativo!');
}); 
