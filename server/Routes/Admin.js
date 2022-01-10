const express = require('express')
const Role    = require('../Config/Role')
const route   = express.Router()
const multers = require('multer')
const upload  = multers()

const Rolemiddleware    = require('../Middlewares/RoleAuth')
const ApiValidation     = require('../APIValidations/APIValidation')
const AdminController   = require('../Controllers/AdminController/AddProduct')
const GetOrdersInfo     = require('../Controllers/AdminController/GetUsersOrders')
const ChangeOrderStatus = require('../Controllers/AdminController/ChangeOrderStatus')


route.get('/orders', Rolemiddleware(Role.admin, Role.superadmin, Role.employee), GetOrdersInfo)
route.put('/order/change-status/:id', Rolemiddleware(Role.admin, Role.superadmin, Role.employee),ChangeOrderStatus)
route.post('/addproduct', upload.single("image"), ApiValidation.AddProductAPIValidation,
    Rolemiddleware(Role.admin, Role.superadmin,), AdminController)
     




module.exports=route