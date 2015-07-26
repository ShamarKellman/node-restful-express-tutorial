//Require neccessary Modules
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var restful = require('node-restful');

var mongoose = restful.mongoose;
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect("mongodb://localhost/movie");

var MovieSchema = mongoose.Schema({
    title: String,
    year: Number,
	stars: Array,
	description: String
  });

var Movie = restful.model('movie', MovieSchema);
  
Movie.methods(['get', 'post', 'put', 'delete']);

Movie.register(app, '/movie');

app.listen(3000, function() {
	console.log("Server listening on http://localhost:3000/");
});