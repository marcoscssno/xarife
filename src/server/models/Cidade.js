import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

import Estado from './Estado'

const Schema = mongoose.Schema

const CidadeSchema = new Schema ({
    _id: ObjectId,
    codigo_ibge: Number,
    nome: String,
    estado: {
        type: ObjectId,
        ref: 'Estado'
    },
})

CidadeSchema.index({nome: 'text'}, {default_language: "portuguese"}, {weights: {nome: 10}, name: "TextIndex"})

const Cidade = mongoose.model('Cidade', CidadeSchema, 'cidades')

export default Cidade