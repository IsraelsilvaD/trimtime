const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../user'); // Modelo de Usuário (criado para usuários do sistema)
const secretKey = 'sua_chave_secreta'; // Idealmente, armazena em variáveis de ambiente (process.env.JWT_SECRET)

// Rota de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: true, message: 'Usuário não encontrado' });
        }

        // Verifica se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: true, message: 'Senha incorreta' });
        }

        // Gera um token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, // Payload
            secretKey, // Chave secreta
            { expiresIn: '24h' } // Expiração do token
        );

        // Retorna o token e dados do usuário
        res.json({
            error: false,
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: true, message: 'Acesso negado, token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Verifica se o token é válido
        req.user = decoded; // Adiciona os dados do usuário ao request
        next(); // Continua para a próxima função
    } catch (err) {
        return res.status(401).json({ error: true, message: 'Token inválido ou expirado' });
    }
};

// Rota protegida de exemplo
router.get('/perfil', authMiddleware, async (req, res) => {
    try {
        // Busca os dados do usuário autenticado
        const user = await UserModel.findById(req.user.id).select('-password'); // Não retorna a senha
        res.json({ error: false, user });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

module.exports = router;
