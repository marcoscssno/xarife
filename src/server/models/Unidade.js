import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const UnidadeSchema = new Schema ({
    nome:  {
        type: String,
        text: true,
        required: true
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

const Unidade = mongoose.model('Unidade', UnidadeSchema)

export default Unidade