const mongoose = require('mangoose');
const Schema = mongoose.Schema;

const barbearia = new Schema({
nome: {
    type: String,
    required: [true, 'O preenchimento do nome é obrigatório.']
},
foto: String,
capa: String,
email:  {
    type: String,
    required: [true, 'O preenchimento do E-mail é obrigatório.']
},
senha:  {
    type: String,
    default: null,
},
telefone: String,
endereco:{
cidade: String,
uf: String,
cep: String,
cep: String,
numero: String,
pais: String,
},
geo:{
    tipo: String,
    coordinates: Array,
},
dataCadastro: {
    type: Date,
    default: Date.now,
}

});

barbearia.index({geo: '2dsphere'});

module.exports = mongoose.model('barbearia', barbearia);