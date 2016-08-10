var express = require('express');
var app = express();

// daily max in pence
var dailyMaxSpend = 1600

app.post('/updateBalance', function (req, res){
  console.log('>>>>')
  console.log(req.body)
  console.log('>>>>')
  console.log(req)
  var currentDailySpend = 1500
  if (currentDailySpend >= (dailyMaxSpend - (dailyMaxSpend/10))){
    res.send('close to daily max')
  }
  if (currentDailySpend >= dailyMaxSpend){
    res.send('You hit daily max: ' + currentDailySpend)
  }
})

app.listen(5050, function(){
  console.log('Kicked off on 5050')
})