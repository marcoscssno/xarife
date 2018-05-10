import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const UserSchema = new Schema ({
    username:  {
        type: String,
        index: { unique: true }
    },
    password: String
})

UserSchema.methods.comparePassword = function comparedPassword(password, callback) {
    bcrypt.compare(password, this.password, callback)
}

UserSchema.pre('save', function (next) {
    const user = this

    // Se a senha for antiga, proceder sem hashear
    if ( ! user.isModified('password') ) { return next() }

    // Se a senha for nova, hashear
    return bcrypt.genSalt((saltError, salt) => {
        if ( saltError ) { return next(saltError) }

        return bcrypt.hash( user.password, salt, ( hashError, hash ) => {
            if ( hashError ) { return next( hashError ) }

            user.password = hash

            return next()
        })
    })
})


const User = mongoose.model('User', UserSchema)

export default User