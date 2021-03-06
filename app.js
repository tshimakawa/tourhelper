const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');

const index = require('./routes/index');
const users = require('./routes/users');
//const search_dest = require('./routes/search_dest');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//app.use('/search_dest',search_dest);

//HTTPS通信で使用するためのSSLキーを設定
const ssloptions = {
        key: fs.readFileSync ('/etc/letsencrypt/live/tshimakawa.dip.jp/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/tshimakawa.dip.jp/cert.pem'),
        ca: [fs.readFileSync('/etc/letsencrypt/live/tshimakawa.dip.jp/chain.pem'), fs.readFileSync('/etc/letsencrypt/live/tshimakawa.dip.jp/fullchain.pem','utf-8')],
requestCert: true,
rejectUnauthorized: false
};

// mongoose.Promise = global.Promise;
// const mongodbUri = 'mongodb://localhost/household_account';
// const mongOptions = {
//     useMongoClient: true,
//     socketTimeoutMS: 0,
//     keepAlive: true,
//     reconnectTries: 30
// };

//ルーティングの設定 各エンドポイントに対応したルーティング先に誘導
app.use('/', index);
app.use('/users', users);
//app.login('/login',login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// ポート設定
app.set('httpsport', process.env.PORT || 50000);

// サーバ立ち上げ
var server = https.createServer(ssloptions,app).listen(app.get('httpsport'), function(){
    console.log('Express HTTPS server listening on port ' + app.get('httpsport'));
    //mongoose.connect(mongodbUri, mongOptions);
});

module.exports = app;
