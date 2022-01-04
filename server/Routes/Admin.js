const express = require('express')
const Role = require('../Config/Role')
const route = express.Router()
const multers = require('multer')

const Rolemiddleware = require('../Middlewares/RoleAuth')
const ApiValidation = require('../APIValidations/APIValidation')
const AdminController = require('../Controllers/AdminController/AddProduct')
const upload = multers()

route.get('',Rolemiddleware(Role.admin,Role.superadmin), (req, res) => {
    return res.json({status:true,message:'admin login successfuly'})
})
route.post('/addproduct', upload.single("image"), ApiValidation.AddProductAPIValidation, Rolemiddleware(Role.admin, Role.superadmin,),
     AdminController)



module.exports=route