var server = require('./server');
var config = require('config');
var logger = require('./common/logger');

var theServer = server.listen(process.env.PORT ? process.env.PORT : config.get('port'), function () {
  logger.debug('Example app listening on port %s', theServer.address().port);
});
