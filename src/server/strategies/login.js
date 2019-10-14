import passport from 'passport'
import LocalStrategy from 'passport-local'
import jwt from 'jsonwebtoken'

import User from '../models/User'

const MyLocalStrategy = new LocalStrategy ({
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({username: username}, (err, user) => {
        if (err) {
            return done(err)
        }

        if(!user) {
            const error = new Error('Incorrect username or password')
            error.name = 'IncorrectCredentialsError'

            return done(error)
        }

        return user.comparePassword(password, (passwordError, same) => {
            if ( err ) { return done( err )}

            if ( ! same ) {
                const error = new Error( 'Incorrect username or password' )
                error.name = 'IncorrectCredentialsError'

                return done( error )
            }

            const payload = {
                id: user._id
            }

            const token = jwt.sign(payload, 'ILoveMyCat', { expiresIn: '24 hours'}, function (error, token) {
                if (error) {
                    return done(error)
                }
                else {
                    
                    const data = {
                        username
                    }
                    
                    return done(null, token, data)
                }
            })
        })
    })
})

export default MyLocalStrategy