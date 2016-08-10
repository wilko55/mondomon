var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');

var request = require('request');

var schedule = require('node-schedule');
var key = process.env.IFTTT_KEY;
var j = schedule.scheduleJob('* * 03 * *', function(){
  currentDailySpend = 0;
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// daily max in pence
var dailyMaxSpend = 1600;

// reset every midnight
var currentDailySpend = 0;

app.post('/updateBalance', function (req, res, next){

  var justSpent = parseInt(req.body.data.amount.replace('-', ''))

  currentDailySpend += justSpent
  var message = '';

  if (currentDailySpend >= (dailyMaxSpend - (dailyMaxSpend/10)) && currentDailySpend <= dailyMaxSpend){
    message = '!! Close to daily max, spent ' + currentDailySpend + '!!';
  }
  else if (currentDailySpend >= dailyMaxSpend) {
    message = '!! You hit daily max. Spent ' + currentDailySpend + ' today!!';
  } 

  if (message !== ''){
    request.post(
      'https://maker.ifttt.com/trigger/balance_update/with/key/' + key,
      { json: { "value1": message }},
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('body: ', body)
            res.send(body)
        }
        else {
          console.log(error)
          res.send(error)
        }
      }
    )
  }
  else {
    res.send('Currently spent ' + currentDailySpend);
  }
})

app.listen(5050, function(){
  console.log('Kicked off on 5050')
})