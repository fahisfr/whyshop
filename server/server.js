var express = require('express');
var app = express();
var db = require('mongoose')
var cors = require('cors')
var morgan = require('morgan')
var PORT = process.env.PORT || 4000;
var cookieParser = require('cookie-parser')
var userAuthentication = require('./Middlewares/UserAuthentication')
db.connect('mongodb://localhost:27017/whyshop', (err, data) => {
    if (err) return err
    console.log('database is on ');
}) 



app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))

app.use('/signup', require('./Routes/Signup'))
app.use('/login', require('./Routes/Login'))
app.use('/products', require('./Routes/Shop'))
app.use('/authentication', require('./Routes/Authentication'))
app.use('/refreshtoken', require('./Routes/RefreshToken'))

app.use(userAuthentication)
app.use('/cart', require('./Routes/Cart'))
app.use('/order', require('./Routes/Order'))

app.use('/admin',require('./Routes/Admin'))


app.listen(PORT, () => console.log('Server is running on port 4000'))