import express from 'Express'

import Agente from '../models/Agente'
import LotacaoDeAgentes from '../models/LotacaoDeAgentes'

const router = express.Router()

// Novo
router.post('/', async (req, res) => {
    const novoAgente = new Agente(req.body)

    try {
        await novoAgente.save()
        res.json({message: "Good!"})
    }
    catch (err) {
        console.log(err)
        if(err.code = 11000) {
            res.status(500).json({message: 'Agente já cadastrado.'})
        }
        else {
            res.status(500).send(err)
        }
    }
})

// Listar todos
router.get('/', async (req, res) => {
    try {
        let ids = []
        let populate = [
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
            }
        ]
        const lotacoes = await LotacaoDeAgentes.find({divisao: {$in: ["5d63dc307fd9cc1de0c26aaa"]}}).exec()
        for (const lotacao of lotacoes) {
            ids.push(lotacao.agente)
        }
        const agentes = await Agente.find({_id: {$in: ids}}).populate(populate).sort('nome').exec()
        res.json(agentes)
    }
    catch (err) {
        res.send(err)
    }
})

// Listar um
router.get('/:id', (req, res) => {
    Agente.findById(req.params.id)
        .populate([{
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
        }])
        .exec((err, agente) => {
            if (err) return console.error(err)
            return res.json(agente)
        })
})

export default router