import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const EquipeSchema = new Schema({
    nome: {
        porExtenso: {
            type: String,
            required: true
        },
        abreviado: String
    },
    ordem: Number,
    grupoDeEquipes: {
        type: ObjectId,
        ref: 'GrupoDeEquipes'
    }
})

EquipeSchema.index(
    {
        "nome.porExtenso": "text",
        "nome.abreviado": "text",
    },
    {
        default_language: 'portuguese'
    }
)

const Equipe = mongoose.model('Equipe', EquipeSchema, 'equipes')

export default Equipe