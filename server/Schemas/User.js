var db = require('mongoose')
var Role_List = require('../Config/Role')

var user = new db.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    role: {
        type: Number,
        // enum: Object.values(Role_List),
        default:Role_List.user,
    },
    password: { type: String, required: true },
    CreaetAt:{type:Date,default:Date.now},
    refreshToken: { type: String, default: null },
})

let Users = db.model('users', user)

module.exports = Users 