var assert = require('chai').assert;
var request = require('request');
var chai = require('chai');
var app = require('../server');

before(function (done) {
	this.server = app.listen(3001, done);
});

describe('An HTTP server', function() {
	it('should make a request', function(done){
		var options = {
			uri: 'http://localhost:3001/',
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
