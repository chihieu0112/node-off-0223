var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dashboardRouter = require('./routes/list');
var formRouter = require('./routes/form');

const mongoose = require('mongoose');
async function connectDb() {
  await mongoose.connect('mongodb+srv://hieu:123@zendvn.u7wzj6y.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('Mongo Connected'))
        .catch(err => console.log(err));
}
connectDb()


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', dashboardRouter);
app.use('/', formRouter);

// catch 404 and forward to error handler33333
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
