var express = require('express');
var products = require('../model/Product');
var jwt = require('jsonwebtoken');
const Users = require('.././model/User');
const userhelper = require('../helper/Userhelper');


var router = express.Router();

const authen = async (req, res, next) => {
  await userhelper.authention(req.headers['x-access-token'], req.headers['y-refresh-token']).then(result => {
    if (result.status) {
      req.user = result.data;
      next();
    } else {
      console.log('Authentication recreate token');
      res.json('')
    }
  }).catch(err => {
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
    res.json({ status: false, cart:[],message: err.message });
  })
  
})
router.put('/change-product-quantity/:id',authen, (req, res) => {
  userhelper.changeProductQuantity(req.user.id, req.body.quantity,req.body.productID).then(result => {
    res.json({ status: true, cart:result.data, message: result.message });
  }).catch(err => {
    res.json({ status: false, message: err.message });
  })
})
router.delete('/remove-from-cart/:id', authen, (req, res) => {
  userhelper.removeCartProduct(req.user._id, req.params.id).then(res => {
    res.json({status:true,cart:res.data,message:res.message})
  }).catch(err => {
    console.log(res.message)
    res.json({ status: false, message:err.message})
  })
})
router.delete('/remove-cart-all-products', (req, res) => {
  userhelper.RemoveallCartProduct(req.user).then(result => {
    res.json({status:true ,message:result.message})
  }).catch(err => {
    res.json({status:false,message:err.message})
  })
})



module.exports = router;
