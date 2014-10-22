var server = require('./server');
var config = require('config');

server.listen(config.get('port'), function () {
	console.log('Example app listening on port %s', config.get('port'));
});
