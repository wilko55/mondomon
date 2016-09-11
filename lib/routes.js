var request = require('request');
var penceToPounds = require('./calcFunctions').penceToPounds

var percentageToWarn = 10;

module.exports = function(app, user, key, dailyMax){

  // daily max in pence
  var dailyMaxSpend = user.dailyMaxSpend;

  app.post('/updateBalance', function (req, res, next){
    if (!!req.body.data.amount){
      var justSpent = -req.body.data.amount

      user.updateCurrentDailySpend(justSpent)

      var message = '';
      if (user.currentDailySpend >= (dailyMaxSpend - (dailyMaxSpend/percentageToWarn)) && user.currentDailySpend <= dailyMaxSpend){
        message = '!! Close to daily max, spent ' + user.formattedDailySpend() + '!!';
      }
      else if (user.currentDailySpend >= 0 && user.currentDailySpend <= dailyMaxSpend) {
        message = 'You\'re fine, only spent ' + user.formattedDailySpend() + ' today :)';
      }
      else if (user.currentDailySpend >= dailyMaxSpend) {
        message = '!! You hit your daily max. Spent ' + user.formattedDailySpend() + ' today!!';
      } 
      if (message !== ''){
        request.post(
          'https://maker.ifttt.com/trigger/balance_update/with/key/' + key,
          { json: { "value1": message }},
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log('sent ok: ', body)
              res.send(body)
            }
            else {
              console.log('error: ' + error)
              res.send(error)
            }
          }
        )
      }
      else {
        res.send('Currently spent ' + penceToPounds(user.formattedDailySpend()));
      }
    }
    else {
      res.status(500)
    }
    
  })

  app.get('/healthcheck', function(req, res, next){
    res.send('I\'m alive. Spent ' + user.formattedDailySpend() + ' today. \n With ' + user.getWeeklyRemainder() + ' left this week.')
  })
}