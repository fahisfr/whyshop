var express = require('express');
var addproduct = require('../model/model');
var addUser = require('.././model/User')
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products/:id',async (req, res) => {

  var result = await addproduct.find({ product_type: req.params.id })
  if (result) {
    res.json({products:result})
  } else {
    res.json({products:false})
  }

  
})
router.post('/signup', async(req, res) => {
  console.log(req.body);
  try {
    await addUser.create({ name: req.body.name, number: req.body.number, password: req.body.password })
    res.json({ status: true })
  } catch (err) {
    res.json({ status: false })
  }
  
  
})
router.post('/login', async (req, res) => {
  try {
    var id = await addUser.findOne({ number: req.body.number, password: req.body.password })
    if (id) {
      const token = jwt.sign({ id: id._id ,name:id.name}, 'dcode', { expiresIn: '1d' })
      res.json({ status: true , token:token,name:id.name})
    } else {
      res.json({ status: false,token:false })
    }
  } catch (err) {
    res.json({ status: false,token:false })
  }
  
})

module.exports = router;
