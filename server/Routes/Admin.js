const express = require('express')
const Role = require('../Config/Role')
const route = express.Router()
const Rolemiddleware = require('../Middlewares/RoleAuth')




route.get('',Rolemiddleware(Role.admin,Role.superadmin), (req, res) => {
    return res.json({status:true,message:'admin login successfuly'})
})
route.post('/addproduct', Rolemiddleware(Role.admin, Role.superadmin), (req, res) => {
    console.log('admin add product', req.body)
    return res.json({ status: true, message: 'admin add product successfuly' })
})



module.exports=route