import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

export const protect = async (req, res, next) => {
    let token; 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "Token inválido. Acesso não autorizado" });
        };
    };

    if (!token) {
        res.status(401).json({ message: "Nenhum token fornecido. Acesso negado" });
    }
} 