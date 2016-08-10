var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// daily max in pence
var dailyMaxSpend = 1600

app.post('/updateBalance', function (req, res){
  console.log(req.body)

  var currentDailySpend = req.body.spend_today
  if (currentDailySpend >= (dailyMaxSpend - (dailyMaxSpend/10))){
    console.log(currentDailySpend + ' spent today, close to daily max')
    res.send('close to daily max')
  }
  else if (currentDailySpend >= dailyMaxSpend){
    console.log(currentDailySpend + ' spent today, you hit daily max')
    res.send('You hit daily max: ' + currentDailySpend)
  }
  else {
    console.log(currentDailySpend + ' spent today, you\'re all good')
    res.send('You\'re fine, only spend ' + currentDailySpend + ' today :)')
  }
})

app.listen(5050, function(){
  console.log('Kicked off on 5050')
})