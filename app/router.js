var express    = require('express');
var server     = require('./server');
var logger     = require('./common/logger');
var config     = require('config');

var glossary   = require('glossary');
var extractor  = require('keyword-extractor');
var word_freq  = require('word-freq');
var say        = require('say');

module.exports = function() {

  var router = express.Router();

  module.addRoutes = function(app) {

    app.use('/', router);

    router.get('/', function(req, res) {
      res.send('<html><body><script>function startSearch(event) {event.target.form.submit();}</script><form method="post" action="/"><input type="text" name="phrase" x-webkit-speech speech required onspeechchange="startSearch" size=100></form></body></html>');
    });

    router.post('/', function(req, res) {
      logger.debug(JSON.stringify('Request body: ' + JSON.stringify(req.body)));

      var result = [];
      var method = req.body.method;
      var phrase = req.body.phrase;

      logger.debug('executing keyword search with: ' + method);
      if (method === 'glossary') {
        result = glossary.extract(phrase);
      } else if (method === 'keyword-extractor') {
        result = extractor.extract(phrase, {language:"english", return_changed_case:true});
      } else if (method === 'word_freq') {
        result = word_freq.freq(phrase);
      } else {
        //result = glossary.extract(phrase);
        //result = extractor.extract(phrase, {language:"english", return_changed_case:true});

        logger.debug('no search method specified, defaulting to word frequency search');
        result = word_freq.freq(phrase);
      }
      logger.debug('Result: ' + JSON.stringify(result));

      if(config.get('speechEnabled')){
        var output = req.body.output;
        if (output === 'say') {
          say.speak('Victoria', result.concat());
        } else if (output === 'count') {
          say.speak('Alex', 'repeated words ' + Object.keys(result));
        } else {
          //say.speak('Victoria', result.concat());
          say.speak('Alex', 'repeated words ' + Object.keys(result));
        }
      }

      res.send({
          keywords: result
      });

    });

  };

  return module;
};
