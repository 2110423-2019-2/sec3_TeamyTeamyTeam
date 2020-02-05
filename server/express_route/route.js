const express = require('express')
const router = express.Router();
const products = [{
    id: '1001',
    name: 'Node.js for Beginners',
    category: 'Node',
    price: 990
}, {
    id: '1002',
    name: 'React 101',
    category: 'React',
    price: 3990
}, {
    id: '1003',
    name: 'Getting started with MongoDB',
    category: 'MongoDB',
    price: 1990
}]

router.get('/products', (req, res) => {
    res.json(products)
})

router.get('/products/:id', (req, res) => {
    const { id } = req.params
    const result = products.find(product => product.id === id)
    res.json(result)
})

router.post('/products', (req, res) => {
    const payload = req.body
    res.json(payload)
})

router.put('/products/:id', (req, res) => {
    const { id } = req.params
    res.json({ id })
})

router.delete('/products/:id', (req, res) => {
    const { id } = req.params
    res.json({ id })
})

module.exports = router;