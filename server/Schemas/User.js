var db = require('mongoose')

var user = new db.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    CreaetAt:{type:Date},
    refreshToken: { type: String, default: null },
})

const Users = db.model('users', user)

module.exports = Users