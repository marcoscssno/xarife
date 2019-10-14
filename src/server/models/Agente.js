import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const AgenteSchema = new Schema ({
    nome:  {
        type: String,
        required: true
    },
    nomeDeGuerra: String,
    matricula: {
        type: String,
        index: { unique: true }
    },
    sexo: String,
    pai: String,
    mae: String,
    tipoSanguineo: String,
    naturalidade: {
        type: ObjectId,
        ref: 'Cidade'
    },
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
        uf: {
            type: ObjectId,
            ref: 'Cidade'
        },
        dataDeExpedicao: Date
    },
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
    lotacoes: [{
        type: ObjectId,
        ref: 'LotacaoDeAgentes'
    }],
    dataDeAquisicao: Date
})

const Agente = mongoose.model('Agente', AgenteSchema)

AgenteSchema.index(
    {
        nome: 'text',
        nomeDeGuerra: 'text'
    },
    {
        default_language: 'portuguese'
    },
    {
        name: 'TextIndex',
        weights: {
            nome: 10,
            nomeDeGuerra: 5
        }
    }
)

export default Agente