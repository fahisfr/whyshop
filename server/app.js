var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var userRouter = require('./routes/Users');
var adminRouter = require('./routes/Admin');
var cookieparser = require('cookie-parser');
var db = require('mongoose')

var app = express();
db.connect('mongodb://localhost:27017/whyshop', (err, data) => {
    if (err) return err
    console.log('database is on ');
})
app.use(logger('dev'));
app.use(express.json());
app.use(cookieparser());
app.use(cors())
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.listen(5000, () => {
    console.log('server is on 3000');
});
module.exports = app;
