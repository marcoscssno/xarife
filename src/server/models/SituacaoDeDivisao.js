import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const SituacaoDeDivisaoSchema = new Schema ({
    nome: {
        type: String,
        unique: true,
        required: true,
    },
})

SituacaoDeDivisaoSchema.index(
    {
        "nome": "text",
    },
    {
        default_language: 'portuguese'
    }
)

const SituacaoDeDivisao = mongoose.model('SituacaoDeDivisao', SituacaoDeDivisaoSchema, 'situacoesDeDivisoes')

export default SituacaoDeDivisao