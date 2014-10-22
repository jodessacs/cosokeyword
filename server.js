var glossary = require ('glossary');
var express = require('express');
var app = express();

app.post("/", function(req, res) {
	res.send({
		keywords: glossary.extract('Testing is fun.')
	});

});

module.exports = app;
