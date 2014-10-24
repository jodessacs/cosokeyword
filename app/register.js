var request = require('request');
var logger  = require('./common/logger');

var registerInfo = {
  teamId: 4,
  endPoint: 'http://cosokeyword.herokuapp.com',
  method: 'POST',
  contentType: 'application/json',
  requiredParams: {
    method: 'text',
    phrase: 'text'
  }
};

module.exports.doRegister = function(callback) {
  var options = {
    uri: 'https://cs-aggregation.herokuapp.com/register',
    body: registerInfo,
    json: true
  };

  logger.debug('request options:' + JSON.stringify(options));
  request.post(options, function(err, resp, body) {
    if(err) {
      callback(err);
      return;
    }

    logger.debug('Got result status: ' + resp.statusCode + ' body: ' + resp.body);
    callback(err, resp);
  });
};
