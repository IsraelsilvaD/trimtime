const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barbearia = new Schema({
    Id: {
      type: mongoose.Schema.Types.ObjectId, // Autogerado
      auto: true
    },
    nome: {
        type: String,
        required: [true, 'O preenchimento do nome é obrigatório.']
    },
    foto: String,
    capa: String,
    email: {
        type: String,
        required: [true, 'O preenchimento do E-mail é obrigatório.']
    },
    telefone: String,
    endereco: {
        type: String,
    },
    contaBancaria: {
        titular: String,
        cpfCnpj: String,
        banco: String,
        tipo: String,
        agencia: String,
        numero: String,
    },
    saldo: {  // Campo para rastrear o saldo da barbearia.
        type: Number,
        default: 0.00,  // Saldo inicial.
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
});

barbearia.index({ location: '2dsphere' });

module.exports = mongoose.model('barbearia', barbearia);
