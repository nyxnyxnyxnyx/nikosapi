var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');
var auth = require('./auth/routes');
var fs = require('fs');
var path = require('path');


// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);

if (config.seed) {
  require('./util/seed');
}
// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api', api);
app.use('/auth', auth);
app.get('/barcode',function(req,res,next){
  fs.readFile(path.join(__dirname, '../barcode'),(err,data)=>{
    fs.writeFile(path.join(__dirname, '../barcode'), parseInt(data)+1, function(err) {
      if(err) {
          return console.log(err);
      }
      res.send(data);
  }); 
  })
  
})



app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

// export the app for testing
module.exports = app;
