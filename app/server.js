var express    = require('express');
var bodyParser = require('body-parser');
var Router     = require('./router');

var app = express();
var router = Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.addRoutes(app);

module.exports = app;
