import express from 'Express'

import Agente from '../models/Agente'

const router = express.Router()

// Novo
router.post('/', (req, res) => {
    const novoAgente = new Agente({
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

// Listar todos
router.get('/', async (req, res) => {
    try {
        const populate = [
            {
                path: 'lotacoes',
                select: 'divisao data',
                options: {
                    sort: '-data'
                },
                populate: {
                    path: 'divisao',
                    select: 'nome.porExtenso nome.sigla'
                }
            },
            {
                path: 'endereco.cidade',
                select: 'nome',
                populate: {
                    path: 'estado',
                    select: 'nome sigla'
                }
            },
        ]
        const agentes = await Agente.find().populate(populate).sort('nome').exec()
        res.json(agentes)
    }
    catch (err) {

    }
})

// Listar um
router.get('/:id', (req, res) => {
    Agente.findById(req.params.id)
        .populate({
            path: 'endereco.cidade',
            select: 'nome',
            populate: {
                path: 'estado',
                select: 'nome sigla'
            }
        })
        .sort('nome')
        .exec((err, agente) => {
            if (err) return console.error(err)
            return res.json(agente)
        })
})

export default router