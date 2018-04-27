import express from 'express'
const router = express.Router();

router.route('/fruits').get((req, res) => {
    res.json({message: 'Hey, it\'s working!'})
})

export default router