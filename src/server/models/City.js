import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

import State from './State'

const Schema = mongoose.Schema

const CitySchema = new Schema ({
    codigo_ibge: Number,
    nome_municipio: String,
    uf: {
        type: ObjectId,
        ref: 'State'
    },
})

const City = mongoose.model('City', CitySchema,)

export default City