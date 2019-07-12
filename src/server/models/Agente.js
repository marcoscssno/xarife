import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const AgenteSchema = new Schema ({
    nome:  {
        type: String,
        text: true,
        required: true
    },
    nomeDeGuerra: String,
    matricula: {
        type: String,
        index: { unique: true }
    },
    pai: String,
    mae: String,
    tipoSanguineo: String,
    naturalidade: ObjectId,
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
            type: String,
            index: {
                unique: true,
                sparse: true
            }
        },
        orgaoExpeditor: String,
        uf: ObjectId,
        dataDeExpedicao: Date
    },
    email: {
        tipo: String,
        endereco: String,
    },
    endereco: {
        tipo: String,
        tipoLogradouro: String,
        nomeLogradouro: String,
        numero: Number,
        bairro: String,
        cidade: ObjectId,
        estado: ObjectId
    }
})

const Agente = mongoose.model('Agente', AgenteSchema)

export default Agente