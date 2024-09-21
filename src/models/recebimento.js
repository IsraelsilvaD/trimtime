const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecebimentoSchema = new Schema({
    agendamentoId: {
        type: Schema.Types.ObjectId, // Referência ao documento de agendamento
        ref: 'Agendamento',
        required: true
    },
    valorRecebido: {
        type: Number, // Valor pago pelo cliente
        required: true
    },
    comissaoColaborador: {
        type: Number, // Comissão do barbeiro
        required: true
    },
    dataRecebimento: {
        type: Date,
        default: Date.now // Data de recebimento (padrão: data atual)
    }
});

const Recebimento = mongoose.model('Recebimento', RecebimentoSchema);
module.exports = Recebimento;
