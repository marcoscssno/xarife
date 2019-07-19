import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const AgenteCSVSchema = new Schema ({
    ID: {
        type: 'String'
    },
    LOTACAO: {
        type: 'String'
    },
    CARGO: {
        type: 'String'
    },
    EQ: {
        type: 'String'
    },
    ORD: {
        type: 'String'
    },
    NOME: {
        type: 'String',
        text: true
    },
    MATR: {
        type: 'String'
    },
    SEXO: {
        type: 'String'
    },
    FUNC: {
        type: 'String'
    },
    RESID: {
        type: 'String'
    },
    TEL_1: {
        type: 'String'
    },
    TEL_2: {
        type: 'String'
    },
    ESCALA: {
        type: 'String'
    },
    EMAIL_1: {
        type: 'String'
    },
    EMAIL_2: {
        type: 'String'
    },
    DATA_AQ: {
        type: 'String'
    }
}, { collection: 'agentesCSV'})

const AgenteCSV = mongoose.model('AgenteCSV', AgenteCSVSchema)

export default AgenteCSV