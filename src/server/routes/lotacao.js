import express from 'express'

import LotacaoDeAgentes from '../models/LotacaoDeAgentes'
import Agente from '../models/Agente'

import lotacoes from '../lotacoesjson.json'

const router = express.Router()


router.post('/tudo', async (req, res) => {
    try {
        const data = lotacoes
        let bulkData = []
        for (const one of data) {
            bulkData.push({
                "insertOne": {
                    "document": one
                }
            })
        }
        const results = await LotacaoDeAgentes.bulkWrite(bulkData)
        res.json(results)
        // res.json(bulkData)
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/ajeitar', async (req, res) => {
    try {
        const lotacoes = await LotacaoDeAgentes.find().sort('data').exec()
        let bulkData = []
        for (const lotacao of lotacoes) {
            Agente.updateOne({ _id: lotacao.agente }, { lotacoes: { $push: lotacao._id } })
            bulkData.push({
                updateOne: {
                    filter: {
                        _id: lotacao.agente
                    },
                    update: {
                        $push: {
                            lotacoes: lotacao._id
                        }
                    }
                }
            })
        }
        const results = await Agente.bulkWrite(bulkData)
        res.send(results)
        // res.send(bulkData)
    }
    catch (err) {
        res.send(err)
    }
})

router.get('/tudo', async (req, res) => {
    try {
        const populate = [
            {
                path: 'agente',
                select: 'nome'
            },
            {
                path: 'divisao',
                select: 'nome.porExtenso'
            },
            {
                path: 'equipe'
            },
            {
                path: 'origem',
                select: 'nome.porExtenso'
            },
            {
                path: 'permuta'
            },
        ]
        const lotacoes = await LotacaoDeAgentes.find().populate(populate).sort('data').exec()
        res.json(lotacoes)
    }
    catch (err) {
        res.send(err)
    }
})

export default router