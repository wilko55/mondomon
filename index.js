var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');

var request = require('request');

var key = process.env.IFTTT_KEY;
var scheduledTasks = require('./lib/scheduledTasks').tasks()
app.use(bodyParser.json());

require('./lib/routes')(app, request, key);

app.listen(5050, function(){
  console.log('Kicked off on 5050')
})