import { loginUserService, registerUserService } from '../services/authService.js';
import { sendSlackNotification } from './slackController.js';

export const loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const loginUser = await loginUserService(phoneNumber, password);
        await sendSlackNotification('info', 'Usuário acessado com sucesso', {
            phoneNumber
        })
        res.status(202).json(loginUser);        
    } catch (error) {
        res.status(500).json({
            message: "Usuário não encontrado"
        })
    }
    
};

export const registerUser = async (req, res) => {
    try {
        const { name, phoneNumber, password } = req.body;
        const registerUser = await registerUserService(name, phoneNumber, password);

        res.status(201).json(registerUser);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao registrar usuário.' 
        });
    }
};
