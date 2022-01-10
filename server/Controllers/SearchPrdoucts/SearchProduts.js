const express = require('express')
const router = express.Router()
const products = require('../../Schemas/Product')

module.exports = router.get('/:id', async (req, res) => {
    products.find({
        $or: [{
            name: {
                $regex: req.params.id,
                $options: 'i'

            }
        }]
    }).then(data => {
        res.json({status: true,message: 'Products found',data: data})})
    
})