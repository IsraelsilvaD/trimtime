const mongoose = require('mangoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const cliente = new Schema({
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
    requeride: false,
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
documento: {
    tipo:{
    type: String,
    requeride: true,
    enum: ['cpf', 'cnpj'],
    }
}, 
numero: {
    type: String,
    requeride: true,
}, 
endereco:{
    cidade: String,
    uf: String,
    cep: String,
    cep: String,
    numero: String,
    pais: String,
    },
dataCadastro: {
    type: Date,
    default: Date.now,
},


});


module.exports = mongoose.model('cliente', cliente);