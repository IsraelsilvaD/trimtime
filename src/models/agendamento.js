const mongoose = require('mangoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const agendamento = new Schema({
    barbeariaid:{
        type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
        ref: 'barbearia', // Relacionamento.
        required: true,
        },
       
       
   clienteid: {
            type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
            ref: 'cliente', // Relacionamento.
            required: true,
   },
   servicoid: {
    type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
    ref: 'servico', // Relacionamento.
    required: true,
},
colaboradorid: {
    type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
    ref: 'colaborador', // Relacionamento.
    required: true,
},
   data: {
    type: Date,
    required: true,
   },
   comissao: {
    type: Number,
    required: true,
   },
   valor: {
    type: Number,
    required: true,
   },
   transactionid: {
    type: String,
    required: true,
   },
        dataCadastro: {
            type: Date,
            default: Date.now,
        },
});



module.exports = mongoose.model('agendamento', agendamento);