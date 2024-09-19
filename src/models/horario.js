const mongoose = require('mangoose');
const Schema = mongoose.Schema;

const horario = new Schema({
   barbeariaid:{
        type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
        ref: 'barbearia', // Relacionamento.
        required: true,
        },
        especialidades: [
        {
            type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
            ref: 'servico', // Relacionamento.
            required: true,
        
        },
    ],
    colaboradores: [
        {
            type: mongoose.tyes.objecId,  // Aqui fala que o id tem que ser existente e valido no model correspondente.
            ref: 'servico', // Relacionamento.
            required: true,
        
        },
    ],
    dias: {
        type:[Number],
        required: true,
    },
    inicio: {
        type:Date,
        required: true,
    },
    fim: {
        type:Date,
        required: true,
    },
    
        dataCadastro: {
            type: Date,
            default: Date.now,
        },
});



module.exports = mongoose.model('horario', horario);