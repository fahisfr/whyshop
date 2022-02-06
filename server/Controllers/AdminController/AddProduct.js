const Product = require('../../Schemas/Product')

const AddProduct = async (req, res,next) => {
    try {
        
        const { name, type, quantity, price } = req.body
        console.log(req.body)
        const image = req.files.image
        console.log(image)
        res.json({success:true})
        const ProductFind = await Product.findOne({ name: name }).exec()
        if (ProductFind) { return res.json({ status: false, message: "product already exist" }) }
        const neweProduct = await Product.create({ name, type, quantity, price })
        const imageName = `${name}${new Date().getTime()}.jpg`
        image.mv('./public/images/' + imageName, (err) => {
            if (err) { return res.json({ status: false, message: "image not uploaded" }) }
            neweProduct.imageId = imageName
            neweProduct.save()
            return res.json({ status: true, message: "product added successfully" })
        })
    } catch (error) {
        next(error)
    }
       
}
module.exports = AddProduct