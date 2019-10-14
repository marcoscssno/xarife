import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const EstadoSchema = new Schema ({
    _id: ObjectId,
    uf: Number,
    sigla: String,
    nome: String,
    cidades: [{
        type: ObjectId,
        ref: 'Cidade'
    }]
})

const Estado = mongoose.model('Estado', EstadoSchema, 'estados')

export default Estado