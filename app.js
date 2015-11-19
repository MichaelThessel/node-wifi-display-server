require('daemon')();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var queue = require('./models/queue.js');

var routes = require('./routes/api');

var app = express();

app.use(logger('dev'));

app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.write(JSON.stringify({ 'status': 'not found' }));
  res.end();
});

// Error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.write(JSON.stringify({ 'status': 'internal server error' }));
  res.end();
});

// Start the job queue
queue.run();

module.exports = app;
