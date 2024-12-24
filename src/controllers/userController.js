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
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        console.log('Usuário atualizado:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        console.log('Usuário deletado:', user);
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
        res.status(500).json({ message: 'Erro ao deletar usuário.' });
    }
};
