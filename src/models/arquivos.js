const mangoose = require('mongoose');
const Schema = mangoose.Schema;

const arquivos = new Schema({
    referenciaid: {
        type: Schema.types.objectid,
        refPatch: 'model'
    },

    model: {
        type: String,
        required: true,
        enum: ['servico', 'salao'],
    },

caminho: {
    type: String,
    required: true,
},

dataCadastro: {
    type: Date,
    default: Date.now
},

})

module.exports = mangoose.model('arquivos', arquivos);