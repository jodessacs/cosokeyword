var express  = require('express');
var glossary = require ('glossary');
var server   = require('./server');

module.exports = function() {

  var router = express.Router();

  module.addRoutes = function(app) {

    app.use('/', router);

    router.get('/', function(req, res) {
      res.send('I am up and running');
    });

    router.post('/glossary/', function(req, res) {
      res.send({
        keywords: glossary.extract('foo is the bar')
      });
    });

  };

  return module;
};
