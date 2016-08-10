var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');

var request = require('request');

var schedule = require('node-schedule');

var key = process.env.IFTTT_KEY;

calculateRemainder = function(currentDailySpend){
  if (currentDailySpend <= dailyMaxSpend){
    remainderForWeek += (dailyMaxSpend - currentDailySpend);
    return remainderForWeek
  }
}

penceToPounds = function(pence){
  return '£' + pence / 100
}


var j = schedule.scheduleJob('09 20 * * *', function(){
  remainderForWeek = calculateRemainder(currentDailySpend)
  currentDailySpend = 0;
});
var k = schedule.scheduleJob('0 17 * * 1', function(){
  // remainder for week
  if (remainderForWeek >= 0){
    message = '!! Finished the week ' + penceToPounds(remainderForWeek) + ' under budget!!';
    request.post(
      'https://maker.ifttt.com/trigger/balance_update/with/key/' + key,
      { json: { "value1": message }},
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('body: ', body)
        }
        else {
          console.log(error)
        }
      }
    )
  }
  remainderForWeek = 0;
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// resets every week
var remainderForWeek = 0;
// resets every midnight
var currentDailySpend = 0;

// daily max in pence
var dailyMaxSpend = 1200;
var percentageToWarn = 10;


app.post('/updateBalance', function (req, res, next){

  if (!!req.body.data.amount){
    var justSpent = parseInt(req.body.data.amount.replace('-', ''))

    currentDailySpend += justSpent
    var message = '';

    if (currentDailySpend >= (dailyMaxSpend - (dailyMaxSpend/percentageToWarn)) && currentDailySpend <= dailyMaxSpend){
      message = '!! Close to daily max, spent ' + penceToPounds(currentDailySpend) + '!!';
    }
    else if (currentDailySpend >= 0 && currentDailySpend <= dailyMaxSpend) {
      // console.log(currentDailySpend + ' spent today, you\'re all good')
      message = 'You\'re fine, only spent ' + penceToPounds(currentDailySpend) + ' today :)';
    }
    else if (currentDailySpend >= dailyMaxSpend) {
      message = '!! You hit your daily max. Spent ' + penceToPounds(currentDailySpend) + ' today!!';
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
      res.send('Currently spent ' + penceToPounds(currentDailySpend));
    }
  }
  else {
    res.status(500)
  }
  
})

app.listen(5050, function(){
  console.log('Kicked off on 5050')
})