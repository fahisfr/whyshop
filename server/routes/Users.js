var express = require('express');
var addproduct = require('../model/model');
var jwt = require('jsonwebtoken');
const Users = require('.././model/User');
const userhelper = require('../helper/Userhelper');
const { resolve } = require('promise');

var router = express.Router();

const authen = async (req, res, next) => {
  console.log('authen start ');
  await userhelper.authention(req.headers['x-access-token'], req.headers['y-refresh-token']).then(result => {
    if (result.status) {
      req.user = result.data;
      next();
    } else {
      // res.json({ status: 200, accesstoken: result.accesstoken, refreshtoken: result.refreshtoken, message: 'Authentication Failed' })
      console.log('Authentication recreate token');
    }
  }).catch(err => {
    res.json({ status: false, message: err.message })
    console.log('authen failed', err.message);
  })
  

}
router.get('/athu', async(req, res,)=>{
  await userhelper.authention(req.headers['x-access-token'], req.headers['y-refresh-token']).then(result => {
    if (result.status) {
      console.log('authen success');
      res.json({name:result.data.name,number:result.data.number,isAthu:true})
    } else {
      res.json({ status: 200, accesstoken: result.accesstoken, refreshtoken: result.refreshtoken, message: 'Authentication Failed' })
    }
  }).catch(err => {
    res.json({ name:'', number: 0, isAthu: false})
  })
});

router.get('/products/:id', (req, res) => {
  console.log('get product');
  addproduct.getProduct(req.params.id, (err, data) => {
    if (err) {
      res.json({ status: false, message: err.message });
    } else {
      res.json({ status: true, data: data });
    }
  });
})
router.post('/signup',(req, res) => {
   userhelper.Signup(req.body).then(result => {
    res.json({status:true,message:result.message})
  }).catch(err => {
    res.json({status:false,message:err.message})
  })
  
  
})
router.post('/login', async (req, res) => {
  userhelper.Login(req.body).then(result => {
    res.json({
      status: true, name: result.data.name, number: result.data.number,
      message: result.message, accesstoken: result.accesstoken, refreshtoken: result.refreshtoken
    })
  }).catch(err => {
    res.json({status:false,message:err.message})
  })
})

module.exports = router;
