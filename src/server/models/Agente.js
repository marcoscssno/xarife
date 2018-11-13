import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AgenteSchema = new Schema ({
    nome:  {
        type: String,
        text: true,
        required: true
    },
    matricula: {
        type: Number,
        index: { unique: true }
    },
    pai: String,
    mae: String,
    tipoSanguineo: String,
    naturalidade: String,
    dataDeNascimento: Date,
    nacionalidade: String,
    grauDeInstrucao: String,
    estadoCivil: String,
    cpf: {
        type: Number,
        index: {
            unique: true,
            sparse: true
        }
    },
    identidade: {
        numero: {
            type: Number,
            index: {
                unique: true,
                sparse: true
            }
        },
        orgaoExpeditor: String,
        uf: String,
        dataDeExpedicao: Date
    },
    email: String,
    nomeDeGuerra: String
})

const Agente = mongoose.model('Agente', AgenteSchema)

export default Agente