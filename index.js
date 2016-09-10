var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var User = require('./lib/User').User

var key = process.env.IFTTT_KEY;
var dailyMax = process.env.DAILY_MAX;
var currentDailySpend = parseInt(process.env.CURRENT_DAILY_SPEND)

var user = new User(dailyMax, currentDailySpend)

var scheduledTasks = require('./lib/scheduledTasks').tasks(key, user, dailyMax)
app.use(bodyParser.json());

require('./lib/routes')(app, user, key, dailyMax, currentDailySpend);

app.listen(5050, function(){
  console.log('Kicked off on 5050. Daily max: ' + dailyMax + ' and currentDailySpend: ' + currentDailySpend)
})