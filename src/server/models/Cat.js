import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

import Owner from './Owner'

const Schema = mongoose.Schema

const CatSchema = new Schema ({
    name: String,
    owner: {
        type: ObjectId,
        ref: 'Owner'
    },
})

const Cat = mongoose.model('Cat', CatSchema, 'kittens')

export default Cat