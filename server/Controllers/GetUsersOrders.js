const Orders = require('../DBSchemas/Order')


module.exports = async (req, res) => {
     Orders.find({}).exec().then(result => {
        console.log(result)
        res.json({ status: true, Orders:result })
    }).catch(error => {
        res.json({ status: false, message: "Oops! Something went wrong" })
    })

}