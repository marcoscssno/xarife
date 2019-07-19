import express from 'express'
import passport from 'passport'
import User from './models/User'
import Agente from './models/Agente'
import axios from 'axios'
import _ from 'lodash'

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
    return passport.authenticate('login', ( err, token, data ) => {
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

        if ( data.message === "Missing credentials" ) {
            return res.status(400).json({
                success: false,
                message: 'Missing credentials'
            })
        }

        return res.json({
            success: true,
            message: 'You have been successfully logged in!',
            token,
            data
        })
    })(req, res, next)
})

router.route('/agentes')
.post((req, res) => {
    const novoAgente = new Agente ({
        nome: req.body.nome,
        matricula: req.body.matricula
    })

    novoAgente.save((err) => {
        if (err) {
            return console.error(err)
        }

        return res.json({
            success: true,
            message: 'Novo Agente cadastrado.'
        })
    })

})
.get((req, res) => {
    Agente.find((err, agentes) => {
        if (err) return console.error(err)
        return res.json(agentes)
    })
})

router.route('/agente/:id')
.get((req, res) => {
    Agente.findById(req.params.id, (err, agente) => {
        if (err) return console.error(err)
        return res.json(agente)
    })
})

router.route('/protected').get((req, res, next) => {
    return passport.authenticate('jwt', (err, user) => {
        if(err) {
            return res.json({message: 'errorx'})
        }
        else {
            return res.json({
                err,
                user
            })
        }
    })(req, res, next)
})

router.route('/pdf').get((req, res) => {
    axios.get('http://localhost:5000', {
        responseType: 'stream'
    })
    .then((response) => {
        response.data.pipe(res)
    })
    .catch((error) => {
        console.error(error)
    })
})

router.get('/checkauthentication', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.send(req.user)
})

import AgenteCSV from './models/AgenteCSV'

router.get('/agentesCSV', (req, res) => {
    AgenteCSV.find({}, (err, agentes) => {
        agentes.forEach(agente => {
            AgenteCSV.findOneAndUpdate({_id: agente._id}, {NOME: _.replace(_.startCase(_.toLower(agente.NOME)), /(De|Da|Das|Do|Dos)/g, x => _.toLower(x))})
        })
    })
})

export default router