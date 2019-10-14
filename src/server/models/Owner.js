import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema

const OwnerSchema = new Schema ({
    name: String
})

const Owner = mongoose.model('Owner', OwnerSchema, 'people')

export default Owner