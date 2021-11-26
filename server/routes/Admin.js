var express = require('express');
var router = express.Router();
var helpers = require('../helper/Adminhelper');
var multer = require('multer');
const { response } = require('express');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/products')
  },
  filename: function (req, file, cb) {
    cb(null, addmin._id +'jpg')
  }
})
var upload = multer().single('image')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/addproduct',upload, async (req, res) => {
  addmin = await helpers.AddProduct(req.body)
  multer({ storage: storage }).single('image')
  
})
router.get('/addpro', (req, res) => {
  console.log(req.body);
  res.json('success')
})
module.exports = router;
