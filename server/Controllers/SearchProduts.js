const express = require('express')
const router = express.Router()
const dbProducts = require('../DBSchemas/Product')

module.exports = router.get('/:id', async (req, res,next) => {
    try {
        const products = await dbProducts.find({
            $or: [{
                name: {
                    $regex: req.params.id,
                    $options: 'i'

                }
            }]
        })
        if (products.length===0) return res.json({ status: false, message: 'Product not found' })
        res.json({ status: true, message: "product found", data: products })

    } catch (err) {
        next(err)
    }
    
})
        
