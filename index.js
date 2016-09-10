var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');

var request = require('request');

var key = process.env.IFTTT_KEY;
var dailyMax = process.env.DAILY_MAX;
var currentDailySpend = process.env.CURRENT_DAILY_SPEND

var scheduledTasks = require('./lib/scheduledTasks').tasks(key, dailyMax)
app.use(bodyParser.json());

require('./lib/routes').routes(app, request, key, dailyMax, currentDailySpend);

app.listen(5050, function(){
  console.log('Kicked off on 5050. Daily max: ' + dailyMax + ' and currentDailySpend: ' + currentDailySpend)
})