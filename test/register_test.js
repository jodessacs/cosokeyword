var assert   = require('chai').assert;
var logger   = require('../app/common/logger');
var register = require('../app/register');

describe('The register module', function() {
  it('should be able to register without error', function(done) {
    register.doRegister(function(err, res) {
      assert.isNull(err);
      assert.isNotNull(res);
      assert.equal(res.statusCode, 200);
      done();
    });
  });
});
