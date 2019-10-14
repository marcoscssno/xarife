import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const MunicipioSchema = new Schema({
    _id: ObjectId,
    uf: Number,
    sigla_uf: String,
    nome_uf: String,
    cidades: [{
        codigo_ibge: Number,
        nome_municipio: String
    }]
})

const Municipio = mongoose.model('Municipio', MunicipioSchema, 'municipios')

export default Municipio