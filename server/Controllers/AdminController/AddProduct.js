const fs = require('fs');
const Product = require('../../Schemas/Product')

const AddProduct = async (req, res) => {
    const { name, type, quantity, price } = req.body
    const  image  = req.file
    const ProductFind = await Product.findOne({ name: name }).exec()
    if (ProductFind) { return res.json({ status: false, message: "product already exist" }) }
    Product.create({ name, type, quantity, price }, async (err, NewProduct) => {
        console.log(err)
        if (!err) {
            const imageID = name+ Date.now()
            NewProduct.imageId = imageID
            NewProduct.save()
                             // is bad practice to use fs.writeFileSync (for example)
            fs.writeFile(`public/images/${imageID}.jpg`, image.buffer, (err, data) => {
                if (err) return res.json({ status: false, message: "image not saved" })
                res.json({ status: true, message: "product added successfully" })})
            
        } else {res.json({ status: false, message: "product not added" })}
    })
}
module.exports = AddProduct