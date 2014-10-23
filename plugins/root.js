var logger     = require('../app/common/logger');
var config     = require('config');

var glossary   = require('glossary');
var extractor  = require('keyword-extractor');
var word_freq  = require('word-freq');
var say        = require('say');

exports.register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path:   '/',
    handler: function (request, reply){
      reply('<html><body><script>function startSearch(event) {event.target.form.submit();}</script><form method="post" action="/"><input type="text" name="phrase" x-webkit-speech speech required onspeechchange="startSearch" size=100></form></body></html>');
    }
  });

  plugin.route({
    method: 'POST',
    path: '/',
    handler: function (request, reply) {

      logger.debug(JSON.stringify('Request body: ' + JSON.stringify(request.payload)));

      var result = [];
      var method = request.payload.method;
      var phrase = request.payload.phrase;

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
        var output = request.payload.output;
        if (output === 'say') {
          say.speak('Victoria', result.concat());
        } else if (output === 'count') {
          say.speak('Alex', 'repeated words ' + Object.keys(result));
        } else {
          //say.speak('Victoria', result.concat());
          say.speak('Alex', 'repeated words ' + Object.keys(result));
        }
      }

      reply({ keywords: result });

    }
  });

  next();
}

exports.register.attributes = {
    name: 'cosokeyword',
    version: '0.0.1'
};