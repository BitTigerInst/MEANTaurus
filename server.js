var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://root:abc123@ds011399.mlab.com:11399/ecommerce-falcon', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the database');
	}
})

app.use(morgan('dev'));

app.get('/', function(req, res) {
	var name = "Batman";
	res.json("My name is " + name);
})

app.listen(3000, function(err) {
	if (err) throw err;
	console.log("Server is Running on port 3000");
});