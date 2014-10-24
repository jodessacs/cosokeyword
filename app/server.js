//var express    = require('express');
var Hapi   = require('hapi');
var config = require('config');

var server = new Hapi.Server('0.0.0.0', process.env.PORT ? process.env.PORT : config.get('port'));

server.pack.register([
  require('../plugins/root'),
  require('good')],
  function (err) {
  if (err) {
      console.error('Failed to load plugin:', err);
  }
});

module.exports = server;
