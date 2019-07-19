var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

import User from '../models/User'

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'ILoveMyCat'
opts.passReqToCallback = true

const MyJwtStrategy = new JwtStrategy(opts, function(req, jwt_payload, done) {
    User.findById(jwt_payload.id, (err, user) => {
        if (err) {
            return done(err, false)
        }

        if (user) {
            return done(null, user)
        }
        
        else {
            return done(null, false)
        }
    })
})

export default MyJwtStrategy