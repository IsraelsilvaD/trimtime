const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const BarbeariaModel = require('../models/barbearia');
const ServicoModel = require('../models/servico');
const PagamentoModel = require('../models/pagamento');
const ColaboradorModel = require('../models/colaborador');
const authMiddleware = require('../middlewares/auth');

// Rota para confirmar o pagamento e calcular a comissão
router.post('/confirmar-pagamento', authMiddleware, async (req, res) => {
    try {
        const { servicoId, colaboradorId, valorPago } = req.body;

        // 1. Verificar se o serviço e colaborador existem
        const servico = await ServicoModel.findById(servicoId);
        if (!servico) {
            return res.status(404).json({ error: true, message: 'Serviço não encontrado.' });
        }

        const colaborador = await ColaboradorModel.findById(colaboradorId);
        if (!colaborador) {
            return res.status(404).json({ error: true, message: 'Colaborador não encontrado.' });
        }

        // 2. Confirmar o pagamento
        const novoPagamento = new PagamentoModel({
            servicoId,
            colaboradorId,
            valorPago,
            dataPagamento: new Date()
        });

        await novoPagamento.save();

        // 3. Adicionar o valor ao saldo da barbearia
        const barbearia = await BarbeariaModel.findById(servico.barbeariaId);
        if (!barbearia) {
            return res.status(404).json({ error: true, message: 'Barbearia não encontrada.' });
        }

        barbearia.saldo += valorPago;
        await barbearia.save();

        // 4. Calcular e dividir a comissão
        const porcentagemComissao = colaborador.comissao; // Ex: 0.3 para 30%
        const valorComissao = valorPago * porcentagemComissao;

        colaborador.saldoComissao += valorComissao;
        await colaborador.save();

        // 5. Resposta com sucesso
        res.json({
            error: false,
            message: 'Pagamento confirmado com sucesso!',
            pagamento: {
                valorPago,
                comissao: valorComissao,
                saldoBarbearia: barbearia.saldo,
                saldoColaborador: colaborador.saldoComissao
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Erro no servidor.' });
    }
});

module.exports = router;
