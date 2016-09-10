var penceToPounds = require('./calcFunctions').penceToPounds
// resets every week
var remainderForWeek = 0;

var percentageToWarn = 10;

module.exports = function(app, request, key, dailyMax, currentDaily){
  // resets every midnight
  var currentDailySpend = parseInt(currentDaily) || 0;

  // daily max in pence
  var dailyMaxSpend = dailyMax || 1200;

  app.post('/updateBalance', function (req, res, next){
    if (!!req.body.data.amount){
      var justSpent = -req.body.data.amount
      currentDailySpend += justSpent

      // pass justSpent to running weekly calculator

      var message = '';
      if (currentDailySpend >= (dailyMaxSpend - (dailyMaxSpend/percentageToWarn)) && currentDailySpend <= dailyMaxSpend){
        message = '!! Close to daily max, spent ' + penceToPounds(currentDailySpend) + '!!';
      }
      else if (currentDailySpend >= 0 && currentDailySpend <= dailyMaxSpend) {
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
              console.log('error: ' + error)
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
}