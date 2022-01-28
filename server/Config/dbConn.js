const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATA_BASE_URL)
        console.log('Databases Connected')
    } catch (err) {
        console.error(err)
    }

}
module.exports=connectDB