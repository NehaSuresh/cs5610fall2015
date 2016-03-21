var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();


var db = mongoose.connect('mongodb://127.0.0.1:27017/cs5610');

console.log(mongoose);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({secret: 'this is the secret', resave: true, saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}


require("./public/assignment4/server/app.js")(app);
require("./public/project/server/app.js")(app, mongoose, db, passport, LocalStrategy);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);