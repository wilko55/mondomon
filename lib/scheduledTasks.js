var schedule = require('node-schedule');
var request = require('request');

module.exports = {
  tasks: function(key, user, dailyMax){
    var j = schedule.scheduleJob('0 13 * * *', function(){
      // reset users daily spending at 2am every day
      user.weeklyTotalSpend += user.currentDailySpend;
      user.currentDailySpend = 0;
    });

    var k = schedule.scheduleJob('0 2 * * 3', function(){
      // reset users weekly spending at 2am every wednesday
      user.weeklyTotalSpend = 0;
    });

    var l = schedule.scheduleJob('0 17 * * 2', function(){
    // let user know weekly remainder
      if (user.weeklyTotalSpend < user.weeklyMaxSpend ){
        message = '!! Finished the week ' + user.getWeeklyRemainder() + ' under budget!!';
        request.post(
          'https://maker.ifttt.com/trigger/balance_update/with/key/' + key,
          { json: { "value1": message }},
          function (error, response, body) {
            if (error) {
              console.log(error)
            }
          }
        )
      }
    });  
  }
}