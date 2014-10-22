var server = require('./server');
var config = require('config');
var logger = require('../common/logger');

server.listen(config.get('port'), function () {
  logger.debug('Example app listening on port %s', config.get('port'));
});
