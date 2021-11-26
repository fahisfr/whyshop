var db = require('mongoose')

var user = new db.Schema({
    name: { type: String, required: true ,unique:true},
    number: { type: Number, required: true },
    password: { type: String, required: true }
    
}, { collection: 'user' })

const Users = db.model('users', user)

module.exports=Users