var express  = require('express');
var glossary = require ('glossary');
var extractor  = require ('keyword-extract');
var server   = require('./server');
var logger   = require('./common/logger');
var say      = require('say');

module.exports = function() {

  var router = express.Router();

  module.addRoutes = function(app) {

    app.use('/', router);

    router.get('/', function(req, res) {
      res.send('<html><body><script>function startSearch(event) {event.target.form.submit();}</script><form method="post" action="/"><input type="text" name="phrase" x-webkit-speech speech required onspeechchange="startSearch" size=100></form></body></html>');
    });

    router.post('/', function(req, res) {
      logger.debug(JSON.stringify(req.body));

      var result = [];
      var method = req.body.method;
      if (method === 'glossary') {
        result = glossary.extract(req.body.phrase);
      } else if (method === 'frequency') {
        logger.debug('IN PROGRESS');
      } else {
        result = glossary.extract(req.body.phrase);
      }

      var output = req.body.output;
      if(output === 'say') {
        say.speak('Victoria', result.concat());
      } else {
        say.speak('Victoria', result.concat());
      }
      res.send({
          keywords: result
      });

    });

  };

  return module;
};
