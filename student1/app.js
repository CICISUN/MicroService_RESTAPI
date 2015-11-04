'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var express    = require('express');
var bodyParser = require('body-parser');
var app = require('express')();

module.exports = app; // for testing


// parse application/json
app.use(bodyParser.json())

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // Add swagger-ui
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // Custom error handler that returns JSON
  app.use(function(err, req, res, next) {
    if (typeof err !== 'object') {
      // If the object is not an Error, create a representation that appears to be
      err = {
        message: String(err) // Coerce to string
      };
    } else {
      // Ensure that err.message is enumerable (It is not by default)
      Object.defineProperty(err, 'message', { enumerable: true });
    }
    res.statusCode = 500;
    res.json(err);
  });

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});
