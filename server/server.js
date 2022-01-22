const express= require('express');
const app    = express();
const db    = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')
const IsAthu = require('./Middlewares/UserAuthentication')
db.connect('mongodb+srv://fahis:cliendaccess@orange.cxvo4.mongodb.net/whyshopDB?retryWrites=true&w=majority', (err, data) => {
    if (err) return console.log(err)
    console.log('database on ')
    
}) 

app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(morgan('dev'))

app.use('/api/product', require('./Routes/Product'))
app.use('/api/shop',require('./Routes/Shop'))
app.use('/api/signup', require('./Routes/Signup'))
app.use('/api/login', require('./Routes/Login'))
app.use('/api/authentication', require('./Routes/Authentication'))
app.use('/api/refreshtoken', require('./Routes/RefreshToken'))
app.use('/api/search-products', require('./Controllers/SearchPrdoucts/SearchProduts'))

app.use('/api/logout',IsAthu, require('./Controllers/UserController/Logout'))
app.use('/api/cart',IsAthu, require('./Routes/Cart'))
app.use('/api/order',IsAthu,require('./Routes/Order'))
app.use('/api/admin',IsAthu,require('./Routes/Admin'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, () => console.log('Server is running on port 4000'))