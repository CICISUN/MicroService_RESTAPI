'use strict';

var SwaggerExpress = require('swagger-express-mw');
var bodyParser = require('body-parser');
var app = require('express')();
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');


module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

// parse application/json
app.use(bodyParser.json());

SwaggerExpress.create(config, function(err, swaggerExpress) {
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.listen(10080);

});

if (app.get('env') === 'development') {  
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {  
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});