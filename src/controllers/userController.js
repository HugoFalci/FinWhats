import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log('Rota de busca de usuário');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};