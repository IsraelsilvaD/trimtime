const mongoose = require('mangoose');
const Schema = mongoose.Schema;

const barbeariaColaborador = new Schema({
    barbeariaid:{
        type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
        ref: 'barbearia', // Relacionamento.
        required: true,
        },
       
    colaborador: {
            type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
            ref: 'colaborador', // Relacionamento.
            required: true,
        
        },
    status: {
        type: String,
        requeride: true,
        enum: ['A', 'I'], // Ativo e Inativo.
        default: 'A' // Sempre que não for passado nada ele sempre vai passar O A de Ativo.
    }, 
        dataCadastro: {
            type: Date,
            default: Date.now,
        },
});



module.exports = mongoose.model('barbeariaColaborador', barbeariaColaborador);