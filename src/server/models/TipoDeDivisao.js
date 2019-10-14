import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const TipoDeDivisaoSchema = new Schema({
    nome: {
        type: String,
        text: true,
        required: true,
    },
})

const TipoDeDivisao = mongoose.model('TipoDeDivisao', TipoDeDivisaoSchema, 'tiposDeDivisoes')

TipoDeDivisaoSchema.index({ nome: 'text' }, { default_language: "portuguese" })

export default TipoDeDivisao