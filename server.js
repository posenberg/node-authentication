var express = require('express');
var app = express();

//declare our port
var port = process.env.PORT || 8080;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

//database config file

var configDB = require('./config/database.js');

//tell mongoose to connect to server

mongoose.connect(configDB.url);
require('./config/passport')(passport);

/* MORGAN 

-pull morgan from node modules folder 
-this is middleware
-boot up and first go through morgan middleware for logs*/
app.use(morgan('dev'));


//cookie-parser middleware
app.use(cookieParser());

//body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//needs 3 different things, secret, saveUnititalized (persistence if the server is lgoed ovf)
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));
//set the view engine to ejs (or the alternative is JADE)
app.set('view engine', 'ejs')

//make sure to use middleware for passport and make sure passport session is AFTER session middleware. IT p piggypacks off of it. 
app.use(passport.initialize());
app.use(passport.session());

 // use connect-flash for flash messages stored in session
app.use(flash());

// app.use('/', function(req, res) {
// 	//respond to client with some sort of string
// 	//res.send is an express function
// 	res.send('our first express program');
// 	console.log(req.cookies);
// 	console.log('=================');
// 	console.log(req.session);
// });

//get routes from a diff file
//note that passport will come passport.js's module.export = function(passport)
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server running on port: ' + port);






