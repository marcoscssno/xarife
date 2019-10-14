import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const StateSchema = new Schema ({
    uf : Number,
    sigla_uf : String,
    nome_uf : String,
})

const State = mongoose.model('State', StateSchema)

export default State