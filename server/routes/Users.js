var express = require('express');
var products = require('../model/model');
var jwt = require('jsonwebtoken');
const Users = require('.././model/User');
const userhelper = require('../helper/Userhelper');


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
      res.json('')
    }
  }).catch(err => {
    // res.json({ status: false, message: err.message })
    console.log('authen failed', err.message);
  })
  

}
router.get('/athu', async(req, res,)=>{
  await userhelper.authention(req.headers['x-access-token'], req.headers['y-refresh-token']).then(result => {
    if (result.status) {
      console.log('authen success');
      res.json({ name: result.data.name, number: result.data.number,isAthu:true })
      console.log(result.data);
    } else {
      res.json({ status: 200, accesstoken: result.accesstoken, refreshtoken: result.refreshtoken, message: 'Authentication Failed' })
    }
  }).catch(err => {
    res.json({ name:'', number: 0, isAthu: false})
  })
});
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

router.get('/products/:id', (req, res) => {
  userhelper.getProduct(req.params.id).then(result => {

    res.json({status:true,products:result.data});
  }
  ).catch(err => {
    res.json({ status: false, message: err.message });
  }
  )
})
router.post('/add-to-cart/:id', authen,async (req, res) => {
  var product = await products.findById(req.params.id);
  if (product) {
    userhelper.addToCart(req.params.id, req.user.id).then(result => {
    res.json({status:true,message:result.message});
  }).catch(err => {
    res.status(500).json({status:false,message:"Oops! Something Went wrong"});
  })
  } else {
    res.json({ status: false, message:'Product Not Found'});
  }
  
})
router.get('/cart', authen, async (req, res) => {
  userhelper.getCart(req.user.id).then(result => {
    res.json({ status: true, cart: result.data });
    console.log(result.data);
  }).catch(err => {
    res.json({ status: false, message: result.message });
  })
  
})



module.exports = router;
