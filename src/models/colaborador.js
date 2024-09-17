const mongoose = require('mangoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const colaborador = new Schema({
nome: {
    type: String,
    requeride: true,
}, 
telefone: {
    type: String,
    requeride: true,
}, 
email: {
    type: String,
    requeride: true,
}, 
senha: {
    type: String,
    requeride: true,
}, 
foto: {
    type: String,
    requeride: true,
}, 
dataNascimento: {
    type: Date,
    requeride: true,
}, 
sexo: {
    type: String,
    enum: ['M', 'F'], // Masculio e Feminino.
    requeride: true,
    
}, 
status: {
    type: String,
    requeride: true,
    enum: ['A', 'I'], // Ativo e Inativo.
    default: 'A' // Sempre que não for passado nada ele sempre vai passar O A de Ativo.
}, 
contaBancaria: {
    titular: {
        type: String,
        required: true
    },
    cpfcnpj: {
        type: String,
        required: true
    },
    banco: {
        type: String,
        required: true
    },
    tipo: {              // Tipo é conta corrente ou poupança.
        type: String,
        required: true
    },
    agencia: {
        type: String,
        required: true
    },
    numero: {          // Número da conta. 
        type: String,
        required: true
    },
    dv: {              // Digito verificador
        type: String,
        required: true,
    },
    recipientid:{
       type: String,
       requeride: true,
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
}

});


module.exports = mongoose.model('colaborador', colaborador);