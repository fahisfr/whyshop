const express = require('express')
const route = express.Router()

const GETCartegory =require('../Controllers/ShowCategory')


route.get('/:id',GETCartegory)




module.exports=route