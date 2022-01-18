var express= require('express');
var app    = express();
var db    = require('mongoose')
var cors = require('cors')
var morgan = require('morgan')
const path = require('path')
var PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
var userAuthentication = require('./Middlewares/UserAuthentication')
db.connect('mongodb+srv://fahis:cliendaccess@orange.cxvo4.mongodb.net/whyshopDB?retryWrites=true&w=majority', (err, data) => {
    if (err) return console.log(err)
    console.log('database on ')
    
}) 

app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(cors())
app.use(morgan('dev'))

app.use('/product', require('./Routes/Product'))
app.use('/shop',require('./Routes/Shop'))
app.use('/signup', require('./Routes/Signup'))
app.use('/login', require('./Routes/Login'))
app.use('/authentication', require('./Routes/Authentication'))
app.use('/refreshtoken', require('./Routes/RefreshToken'))
app.use('/search-products', require('./Controllers/SearchPrdoucts/SearchProduts'))

app.use(userAuthentication)
app.use('/logout', require('./Controllers/UserController/Logout'))
app.use('/cart', require('./Routes/Cart'))
app.use('/order', require('./Routes/Order'))

app.use('/admin', require('./Routes/Admin'))


//
app.use('*', (req, res) => {
    //send the index.html file for all the requests
    res.sendFile(path.join(__dirname, 'public/static/index.html'));
})

app.listen(PORT, () => console.log('Server is running on port 4000'))