import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const GrupoDeEquipesSchema = new Schema({
    nome: {
        porExtenso: {
            type: String,
            required: true
        },
        abreviado: String
    },
    horasDeTrabalho: Number,
    horasDeDescanso: Number,
    dataDeInicio: Date,
})

GrupoDeEquipesSchema.index(
    {
        "nome.porExtenso": "text",
        "nome.abreviado": "text",
    },
    {
        default_language: 'portuguese'
    }
)

const GrupoDeEquipes = mongoose.model('GrupoDeEquipes', GrupoDeEquipesSchema, 'gruposDeEquipes')

export default GrupoDeEquipes