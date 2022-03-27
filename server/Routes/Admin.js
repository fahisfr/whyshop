const express = require('express')
const Role    = require('../Config/Roles')
const route   = express.Router()


const Rolemiddleware    = require('../Middlewares/RoleAuth')
const ApiValidation     = require('../APIValidations/APIValidation')
const AdminController   = require('../Controllers/AddProduct')
const GetOrdersInfo     = require('../Controllers/GetUsersOrders')
const ChangeOrderStatus = require('../Controllers/ChangeOrderStatus')
const EditeProduct      = require('../Controllers/EditProduct')



route.get('/orders', Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee), GetOrdersInfo)
route.put('/order/change-status/:id', Rolemiddleware(Role.Admin, Role.SuperAdmin,Role.Employee), ChangeOrderStatus)
route.post('/addproduct', Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),ApiValidation.AddProductAPIValidation,AdminController)
route.put('/editproduct/:id', Rolemiddleware(Role.Admin, Role.SuperAdmin, Role.Employee),ApiValidation.EditProductAPIValidation,EditeProduct)




module.exports=route