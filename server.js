var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:abc123@ds011399.mlab.com:11399/ecommerce-falcon', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the database');
	}
})

// Middleware
app.use(express.static(__dirname + '/public')); // the public folder for static files(css...)
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, function(err) {
	if (err) throw err;
	console.log("Server is Running on port 3000");
});