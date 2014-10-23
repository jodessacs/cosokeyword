var server     = require('./server');
var logger     = require('./common/logger');
var config     = require('config');

var glossary   = require('glossary');
var extractor  = require('keyword-extractor');
var word_freq  = require('word-freq');
var say        = require('say');

logger.debug(JSON.stringify(server));

