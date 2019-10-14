import express from 'express'

import Equipe from '../models/Equipe'
import GrupoDeEquipe from '../models/GrupoDeEquipe'

import grupos from '../grupos.json'
import equipes from '../equipes.json'

const router = express.Router()


// Equipes

router.post('/tudo', async (req, res) => {
    try {
        const data = equipes
        let bulkData = []
        for (const one of data) {
            bulkData.push({
                insertOne: {
                    document: one
                }
            })
        }
        const operation = await Equipe.bulkWrite(bulkData)
        res.json(operation)
    }
    catch (err) {
        res.send(err)
    }
})

router.get('/tudo', async (req, res) => {
    try {
        const populate = {
            path: 'grupoDeEquipes',
        }
        const equipes = await Equipe.find().populate(populate).exec()
        res.json(equipes)
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/:id', async (req, res) => {

})

router.get('/:id', async (req, res) => {

})

router.put('/:id', async (req, res) => {

})

router.delete('/:id', async (req, res) => {

})


// Grupos de Equipes

router.post('/grupo/tudo', async (req, res) => {
    try {
        const data = grupos
        let bulkData = []
        for (const one of data) {
            bulkData.push({
                insertOne: {
                    document: one
                }
            })
        }
        const operation = await GrupoDeEquipe.bulkWrite(bulkData)
        res.json(operation)
    }
    catch (err) {
        res.send(err)
    }
})

router.get('/grupo/tudo', async (req, res) => {
    try {
        const grupos = await GrupoDeEquipe.find().exec()
        res.json(grupos)
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/grupo/:id', async (req, res) => {

})

router.get('/grupo/:id', async (req, res) => {

})

router.put('/grupo/:id', async (req, res) => {

})

router.delete('/grupo/:id', async (req, res) => {

})

export default router