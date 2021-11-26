var express = require('express');
var { addproduct } = require('../model/model');
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
module.exports = router;
