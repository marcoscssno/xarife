import express from 'express'
import Divisao from '../models/Divisao'
import TipoDeDivisao from '../models/TipoDeDivisao'
import SituacaoDeDivisao from '../models/SituacaoDeDivisao'
import divisaojson from '../divisaojson.json'
const router = express.Router();

// Divisao

router.get('/tudo', async (req, res) => {
    try {
        const populate = [
            {
                path: 'endereco.cidade',
                select: 'nome',
                populate: {
                    path: 'estado',
                    select: 'sigla'
                }
            },
            {
                path: 'tipo',
                select: 'nome'
            },
        ]
        const divisoes = await Divisao.find().populate(populate).sort('tipo').sort('nome.porExtenso').exec()
        res.json(divisoes)
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/tudo', async (req, res) => {
    try {
        const data = divisaojson
        let bulkData = []
        for (const one of data) {
            bulkData.push({
                insertOne: {
                    document: {
                        nome: {
                            porExtenso: one.nome,
                            sigla: one.sigla
                        },
                        tipo: one.tipo,
                        endereco: {
                            cidade: one.cidade
                        }
                    }
                }
            })
        }
        const operation = await Divisao.bulkWrite(bulkData)
        res.json(operation)
    }
    catch (err) {
        res.send(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const divisao = await Divisao.findOne().where({ _id: id }).exec()
        res.json(divisao)
    }
    catch (err) {
        res.send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await Divisao.remove({ _id: id })
        res.send(result.deletedCount)
    }
    catch (err) {
        res.send(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await Divisao.updateOne({ _id: id }, req.body.data)
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
})

// Tipo

router.get('/tipo/tudo', async (req, res) => {
    try {
        const tipos = await TipoDeDivisao.find().exec()
        res.json(tipos)
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/tipo/', async (req, res) => {
    try {
        const tipo = req.body.tipo
        const document = {
            tipo: tipo
        }
        const tipoDeDivisao = new TipoDeDivisao(document)
        const novoTipoDeDivisao = await tipoDeDivisao.save()
        res.json(novoTipoDeDivisao)
    }
    catch (err) {
        res.send(err)
    }
})

router.get('/tipo/:id', async (req, res) => {
    try {
        const id = req.params.id
        const tipo = await TipoDeDivisao.findOne().where({ _id: id }).exec()
        res.json(tipo)
    }
    catch (err) {
        res.send(err)
    }
})

router.delete('/tipo/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await TipoDeDivisao.remove({ _id: id })
        res.send(result.deletedCount)
    }
    catch (err) {
        res.send(err)
    }
})

// Situacao

router.get('/situacao/', async (req, res) => {
    try {
        const situacoes = await SituacaoDeDivisao.find().exec()
        res.json(situacoes)
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/situacao/', async (req, res) => {
    return res.send('criar novo')
})

router.get('/situacao/:id', async (req, res) => {
    try {
        const id = req.params.id
        const situacao = await SituacaoDeDivisao.findOne().where({ _id: id }).exec()
        res.json(situacao)
    }
    catch (err) {
        res.send(err)
    }
})

router.delete('/situacao/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await SituacaoDeDivisao.remove({ _id: id })
        res.send(result.deletedCount)
    }
    catch (err) {
        res.send(err)
    }
})

export default router