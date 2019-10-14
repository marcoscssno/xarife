// Packages
import express from 'express'
import passport from 'passport'
import _ from 'lodash'

// Models
import User from './models/User'
import axios from 'axios'
import AgenteCSV from './models/AgenteCSV'
import Municipio from './models/Municipio'
import City from './models/City'
import Cidade from './models/Cidade'
import Estado from './models/Estado'
import State from './models/State'
import Cat from './models/Cat'
import Owner from './models/Owner'
import Logradouro from './models/Logradouro'

// Routes
import divisao from './routes/divisao'
import agente from './routes/agente'
import equipe from './routes/equipe'
import lotacao from './routes/lotacao'

// Helpers
import { titleCase } from '../shared/helpers/texto'

const router = express.Router();

router.use('/divisao', divisao)
router.use('/agente', agente)
router.use('/equipe', equipe)
router.use('/lotacao', lotacao)

router.route('/fruits').get((req, res) => {
    return res.json({ message: 'Hey, it\'s working!' })
})

router.route('/users')
    .post((req, res) => {
        const NewUser = new User({
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
    return passport.authenticate('login', (err, token, data) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
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

        if (data.message === "Missing credentials") {
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

router.route('/protected').get((req, res, next) => {
    return passport.authenticate('jwt', (err, user) => {
        if (err) {
            return res.json({ message: 'errorx' })
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

router.route('/test').get(async (req, res) => {
    try {
        res.write('<p>started</p>')
        const agentes = await AgenteCSV.find({}).limit(10).exec()
        agentes.map(agente => (res.write(`<p>${agente.NOME}<p>`)))
        res.write('<p>ended</p>')
        res.end()
    }
    catch (err) {
        res.write(err)
        res.end()
    }
})

router.route('/logradouros')
    .get(async (req, res) => {
        try {
            const logradouro = await Logradouro.find().sort('tipo').exec()
            res.json(logradouro)
        }
        catch (err) {
            res.send(err)
        }
    })

router.route('/logradouro/:id')
    .get(async (req, res) => {
        try {
            const id = req.params.id
            const logradouro = await Logradouro.findOne().where({_id: id}).exec()
            res.json(logradouro)
        }
        catch (err) {
            res.send(err)
        }
    })
    .delete(async (req, res) => {
        try {
            const id = req.params.id
            const result = await Logradouro.remove({_id: id})
            res.send(result.deletedCount)
        }
        catch (err) {
            res.send(err)
        }
    })

router.route('/logradouro')
    .post(async (req, res) => {
        try {
            const tipo = req.body.tipo
            const logradouro = new Logradouro({ tipo: tipo })
            const novoLogradouro = await logradouro.save()
            res.json(novoLogradouro)
        }
        catch (err) {
            res.send(err)
        }
    })

export default router