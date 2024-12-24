import User from '../models/userModel.js';
import { generateToken } from '../utils/jwt.js';

export const loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "Por favor, informe o número de telefone e a senha" });
        }  

        const user = await User.findOne({ phoneNumber });

        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, phoneNumber, password } = req.body;

        if (!name || !phoneNumber || !password) {
            return res.status(400).json({ message: 'Todos os campos obrigatórios precisam ser preenchidos.' });
        }

        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'Número de telefone já registrado.' });
        }

        const user = new User({ name, phoneNumber, password });
        await user.save();

        console.log('Usuário registrado:', user);

        res.status(201).json({
            id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.message);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};
