var server = require('./server');
var config = require('config');
var logger = require('./common/logger');

server.start(function () {
  logger.debug('Starting server:' + server.info.uri + ' with port:' + process.env.PORT);
});
