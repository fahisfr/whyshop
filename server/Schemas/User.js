const db = require('mongoose')
const Role_list = require('../Config/Roles')

const user = new db.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    role: {
        type:String,
        // enum: Object.values(Role_List),
        default:Role_list.User,
    },
    password: { type: String, required: true },
    CreaetAt:{type:Date,default:Date.now},
    refreshToken: { type: String, default: null },
})

const Users = db.model('users', user)

module.exports = Users 