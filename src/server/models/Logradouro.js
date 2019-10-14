import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const LogradouroSchema = new Schema({
    tipo: {
        type: String,
        text: true,
        required: true,
    }
})

const Logradouro = mongoose.model('Logradouro', LogradouroSchema, 'logradouros')

LogradouroSchema.index({ tipo: 'text'}, { default_language: "portuguese" })

export default Logradouro