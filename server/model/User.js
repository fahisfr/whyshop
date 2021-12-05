var db = require('mongoose')

var user = new db.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true ,unique:true},
    password: { type: String, required: true },
    refreshToken: { type: String ,default:'refreshToken'},
    uptime: { type: Date, default:Date.now }
}, { collection: 'user' })

const Users = db.model('users', user)

module.exports=Users