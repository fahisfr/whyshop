require("dotenv").config();

const express= require('express');
const app    = express();
const db     = require('mongoose')
const cors   = require('cors')
const morgan = require('morgan')
const path   = require('path')
const PORT = process.env.PORT || 4000;
const fileupload = require('express-fileupload')
const IsAthu = require('./Middlewares/UserAuthentication')
const cookieParser = require('cookie-parser')
const connectDB    = require('./Config/dbConn')
const errorHandler = require('./Config/errorHandler')


connectDB()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(fileupload())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/home', require('./Routes/Home'))
app.use('/api/product', require('./Routes/Product'))
app.use('/api/shop',require('./Routes/Shop'))
app.use('/api/signup', require('./Routes/Signup'))
app.use('/api/login', require('./Routes/Login'))
app.use('/api/authentication', require('./Routes/Authentication'))
app.use('/api/refreshtoken', require('./Routes/RefreshToken'))
app.use('/api/search-products', require('./Controllers/SearchPrdoucts/SearchProduts'))

app.use('/api/cart',IsAthu, require('./Routes/Cart'))
app.use('/api/order',IsAthu,require('./Routes/Order'))
app.use('/api/admin', require('./Routes/Admin'))
app.use('/api/logout', IsAthu, require('./Controllers/UserController/Logout'))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))