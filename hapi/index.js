var Good = require('good');
var Hapi = require('hapi');

var server = new Hapi.Server(3000);

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});

var options = {
  opsInterval: 1000,
  reporters: [{
    reporter: Good.GoodConsole
  }, {
    reporter: Good.GoodFile,
    args: ['./test/fixtures/awesome_log', {
      events: {
        ops: '*'
      }
    }]
  }, {
    reporter: require('good-http'),
    args: ['http://prod.logs:3000', {
      events: {
        error: '*'
      },
      threshold: 20,
      wreck: {
        headers: { 'x-api-key' : 12345 }
      }
    }]
  }]
};

server.pack.register({
  plugin: require('good'),
  options: options
}, function (err) {

 if (err) {
  console.log(err);
  return;
 }
});
