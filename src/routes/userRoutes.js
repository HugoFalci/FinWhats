import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        console.log('Rota de busca de usuário');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default router;