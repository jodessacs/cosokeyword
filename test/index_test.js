var assert  = require('chai').assert;
var request = require('request');
var config  = require('config');
var app     = require('../app/server');
var logger  = require('../app/common/logger');


before(function (done) {
  this.server = app.listen(config.get('port'), done);
});

describe('An HTTP server', function() {
  it('should make a request', function(done){
    var options = {
      uri: 'http://localhost:' + config.get('port') + '/',
      body: 'Testing',
      json: true
    };

    request.post(options, function(err, resp, body) {
      if(err) {
        throw err;
      }

      assert.equal(resp.statusCode, 200);
      assert.isObject(resp.body, 'The response is an object');
      done();
    });
  });
});

after(function() {
  this.server.close();
});
