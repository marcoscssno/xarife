import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const DivisaoSchema = new Schema({
    nome: {
        porExtenso: {
            type: String,
        },
        abreviado: {
            type: String,
        },
        sigla: {
            type: String,
        }
    },
    tipo: {
        type: ObjectId,
        ref: 'TipoDeDivisao'
    },
    divisaoSuperior: {
        type: ObjectId,
        ref: 'Divisao'
    },
    divisoesInferiores: [{
        type: ObjectId,
        ref: 'Divisao'
    }],
    telefone: [{
        tipo: String,
        numero: Number
    }],
    email: [{
        tipo: String,
        endereco: String,
    }],
    endereco: [{
        tipo: String,
        cep: Number,
        tipoLogradouro: {
            type: ObjectId,
            ref: 'Logradouro'
        },
        nomeLogradouro: String,
        numero: Number,
        bairro: String,
        bloco: String,
        quadra: String,
        complemento: String,
        cidade: {
            type: ObjectId,
            ref: 'Cidade'
        },
        estado: {
            type: ObjectId,
            ref: 'Estado'
        },
        longitude: Number,
        latitude: Number,
    }],
    situacoes: [{
        tipoDeSituacao: {
            type: ObjectId,
            ref: 'SituacaoDeDivisao'
        },
        motivo: String,
        data: Date
    }]
})

DivisaoSchema.index(
    {
        "nome.por_extenso": "text",
        "nome.abreviado": "text",
        "nome.sigla": "text",
    },
    {
        default_language: 'portuguese'
    }
)

const Divisao = mongoose.model('Divisao', DivisaoSchema, 'divisoes')

export default Divisao