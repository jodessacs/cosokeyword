var assert  = require('chai').assert;
var request = require('request');
var config  = require('config');
var app     = require('../app/server');
var logger  = require('../app/common/logger');


before(function (done) {
  this.server = app.listen(config.get('port'), done);
});

describe('An HTTP server', function() {
  it('should make a request using glossary method', function(done){
    var options = {
      uri: 'http://localhost:' + config.get('port') + '/',
      body: {
        phrase: 'the cat climbed the tree then jump on the roof',
        method: 'glossary',
        output: 'say'
      },
      json: true
    };

    logger.debug(JSON.stringify(options));
    request.post(options, function(err, resp, body) {
      if(err) {
        throw err;
      }

      assert.equal(resp.statusCode, 200);
      assert.equal(resp.body.keywords.concat(), 'cat,tree,jump,roof');
      logger.debug('Result: ' + resp.body.keywords.concat());
      done();
    });
  });

  it('should make a request using keyword-extractor', function(done){
    var options = {
      uri: 'http://localhost:' + config.get('port') + '/',
      body: {
        phrase: 'the cat climbed the tree then jump on the roof',
        method: 'keyword-extractor',
        output: 'say'
      },
      json: true
    };

    logger.debug(JSON.stringify(options));
    request.post(options, function(err, resp, body) {
      if(err) {
        throw err;
      }

      assert.equal(resp.statusCode, 200);
      assert.equal(resp.body.keywords.concat(), 'cat,climbed,tree,jump,roof');
      logger.debug('Result: ' + resp.body.keywords.concat());
      done();
    });
  });

  it('should make a request using word frequency', function(done){
    var options = {
      uri: 'http://localhost:' + config.get('port') + '/',
      body: {
        phrase: 'how much wood would a woodpecker peck if a woodpecker could peck wood',
        method: 'word_freq',
        output: 'count'
      },
      json: true
    };

    logger.debug(JSON.stringify(options));
    request.post(options, function(err, resp, body) {
      if(err) {
        throw err;
      }

      assert.equal(resp.statusCode, 200);
      assert.equal(Object.keys(resp.body.keywords).toString(), 'wood,woodpeck,peck');
      logger.debug('Result: ' + JSON.stringify(resp.body.keywords));
      done();
    });
  });
});

after(function() {
  this.server.close();
});
