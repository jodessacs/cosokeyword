var glossary = require ('glossary');
var express  = require('express');

var app = express();

app.post("/", function(req, res) {
	res.send({
		keywords: glossary.extract('foo is the bar')
	});

});

module.exports = app;
