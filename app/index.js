var server   = require('./server');
var config   = require('config');
var logger   = require('./common/logger');
var register = require('./register');

server.start(function () {
  logger.debug('Starting server:' + server.info.uri + ' with port:' + process.env.PORT);
  register.doRegister(function(err, res) {
    if(err) {
      logger.debug('register failed');
    } else {
      logger.debug('registered');
    }
  });
});
