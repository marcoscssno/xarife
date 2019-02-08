var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

import User from '../models/User'

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'ILoveMyCat'

const MyJwtStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.id, (err, user) => {
        if (err) {
            return done(err, false)
        }

        if (user) {
            return done(null, user)
        }
        
        else {
            const error = new Error('User not found')
            error.name = 'UserNotFound'
            return done(error, false)
        }
    })
})

export default MyJwtStrategy