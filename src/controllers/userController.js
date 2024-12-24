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

export const createUsers = async (req, res) => {
    try {
        const {
            name,
            phoneNumber,
            password
        } = req.body;

        if (!name || !phoneNumber || !password) {
            return res.status(400).json({ message: "Todos os campos obrigatórios precisam ser preenchidos"});
        };

        const user = new User({
            name,
            phoneNumber,
            password
        });

        await user.save();
        console.log("Usuário criado: ", user);
        res.status(201).json(user);
    } catch (error) {
        console.error("Falha ao criar novo usuário: ", error.message);
        res.status(500).json({ message: "Falha ao criar novo usuário: " });
    }
}