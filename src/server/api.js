import express from 'express'
import passport from 'passport'
import User from './models/User'

const router = express.Router();

router.route('/fruits').get((req, res) => {
    return res.json({message: 'Hey, it\'s working!'})
})

router.route('/users')
.post((req, res) => {
    const NewUser = new User ({
        username: req.body.username,
        password: req.body.password
    })

    NewUser.save((err) => {
        if (err) {
            return console.error(err)
        }

        return res.json({
            success: true,
            message: 'Got a new user.'
        })
    })

})
.get((req, res) => {
    User.find((err, users) => {
        if (err) return console.error(err)
        return res.json(users)
    })
})

router.post('/login', (req, res, next) => {
    
    // Validation goes here

    return passport.authenticate('login', ( err, token, userData ) => {
        if ( err ) {
            if ( err.name === 'IncorrectCredentialsError' ) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }
            
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            })
        }

        return res.json({
            success: true,
            message: 'You have been successfully logged in!',
            token,
            user: userData
        })
    })(req, res, next)
})

export default router