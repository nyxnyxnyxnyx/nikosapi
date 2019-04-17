var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var override = require('method-override');
var express = require('express');
var path = require('path');

// setup global middleware here

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
  console.log(path.join(__dirname, '../../uploads'))
  app.use('/uploads',express.static(path.join(__dirname, '../../uploads')));
};
