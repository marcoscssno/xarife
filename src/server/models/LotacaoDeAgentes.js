import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const LotacaoDeAgentesSchema = new Schema({
    idAntigo: Number,
    agente: {
        type: ObjectId,
        ref: 'Agente'
    },
    divisao: {
        type: ObjectId,
        ref: 'Divisao',
        required: true
    },
    equipe: {
        type: ObjectId,
        ref: 'Equipe'
    },
    origem: {
        type: ObjectId,
        ref: 'Divisao'
    },
    data: Date,
    documento: String,
    permuta: {
        type: ObjectId,
        ref: 'LotacaoDeAgentes'
    },
})

LotacaoDeAgentesSchema.index(
    {
        "$**": "text",
    },
    {
        default_language: 'portuguese'
    }
)

const LotacaoDeAgentes = mongoose.model('LotacaoDeAgentes', LotacaoDeAgentesSchema, 'lotacoesDeAgentes')

export default LotacaoDeAgentes