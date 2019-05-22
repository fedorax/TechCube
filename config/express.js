'use strict';

// Load the module dependencies
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const logger = require(path.resolve('config/logger'));
//const session = require('express-session');

require(path.resolve('config/line'));

// Define the Express configuration method
module.exports = function () {
  // Create a new Express application instance
  const app = express();

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  // app.use(bodyParser.urlencoded({
  //   extended: true
  // }));
  // app.use(bodyParser.json());
  // app.use(methodOverride());

  // Write access logs
  app.use(logger.connectLogger(logger.getLogger('access')));
  // Configure the route
  require(path.resolve('config/router'))(app);

  // Configure the 'session' middleware
  // app.use(session({
  // 	saveUninitialized: true,
  // 	resave: true,
  // 	secret: config.sessionSecret
  // }));

  // Load the 'index' routing file
  require('../app/routes/index.route.js')(app);

  // Configure static file serving
  app.use(express.static('./public'));
  app.use('/lib', express.static(path.resolve('./node_modules')));

  // Set the application view engine and 'views' folder
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  // Return the Express application instance
  return app;
};
