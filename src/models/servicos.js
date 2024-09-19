const mongoose = require('mangoose');
const Schema = mongoose.Schema;

const servico = new Schema({
barbeariaid:{
type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
ref: 'barbearia', // Relacionamento.
required: true,
},
titulo: {
    type: String,
    required: true,
},
preco: {
    type: Number,
    required: true,
},

duracao: {          // Duração em minutos.
    type: Number,
    required: true,
},
recorrencia: {
    type: Number,  //Período de recorrencia em que o cliente faz o serviço em dias.
    required: true,
},
descricao: {
    type: String,
    required: true,
},
status: {
    type: String,
    requeride: true,
    enum: ['A', 'I', 'E'], // Ativo, Inativo e Excluido.
    default: 'A' // Sempre que não for passado nada ele sempre vai passar O A de Ativo.
}, 
dataCadastro: {
    type: Date,
    default: Date.now,
},

});



module.exports = mongoose.model('servico', servico);