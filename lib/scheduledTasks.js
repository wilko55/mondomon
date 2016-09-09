var schedule = require('node-schedule');

module.exports = {
  tasks: function(){
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
  }
}