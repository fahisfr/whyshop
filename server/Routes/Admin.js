const express = require('express')
const Role    = require('../Config/Roles')
const route   = express.Router()
const multers = require('multer')
const upload  = multers()

const Rolemiddleware    = require('../Middlewares/RoleAuth')
const ApiValidation     = require('../APIValidations/APIValidation')
const AdminController   = require('../Controllers/AdminController/AddProduct')
const GetOrdersInfo     = require('../Controllers/AdminController/GetUsersOrders')
const ChangeOrderStatus = require('../Controllers/AdminController/ChangeOrderStatus')
const EditeProduct      = require('../Controllers/AdminController/EditProduct')


route.get('/orders', Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee), GetOrdersInfo)
route.put('/order/change-status/:id', Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),ChangeOrderStatus)
route.post('/addproduct', upload.single("image"), ApiValidation.AddProductAPIValidation,
    Rolemiddleware(Role.Admin,Role.SuperAdmin,), AdminController)
route.post('/editproduct/:id',EditeProduct)




module.exports=route