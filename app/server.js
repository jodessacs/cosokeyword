var glossary = require ('glossary');
var express = require('express');
var app = express();

app.post("/", function(req, res) {
	console.log(req);
	res.send({
		keywords: glossary.extract(req.body)
	});

});

module.exports = app;
