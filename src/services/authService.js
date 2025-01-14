import User from '../models/userModel.js';

export const loginUserService = async (phoneNumber, password) => {
    try {
        if (!phoneNumber || !password) {
            throw new Error('Por favor, informe o número de telefone e a senha');
        };

        const user = await User.findOne({ phoneNumber });

        if (user && (await user.matchPassword(password))) {
            return { success: true, message: 'Acesso aprovado' }
        } else {
            throw new Error('Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        throw new Error('Erro ao fazer login');
    } 
}

export const registerUserService = async (name, phoneNumber, password) => {
    try {
        if (!name || !phoneNumber || !password) {
            throw new Error('Todos os campos obrigatórios precisam ser preenchidos');
        }
    
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return { success: false, message: 'Número de telefone já cadastrado' };
        }
    
        const user = new User({ name, phoneNumber, password });
        await user.save();
    
        console.log('Usuário cadastrado:', user);    
        return { success: true, message: 'Usuário cadastrado com sucesso' };
    } catch (error) {        
        console.error('Erro ao cadastrar usuário:', error.message);
        throw new Error('Erro ao cadastrar usuário');
    }
}