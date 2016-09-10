var schedule = require('node-schedule');
var request = require('request');
var calcFunctions = require('./calcFunctions'); 

var updateWeeklyTotal = function(dailyMax, ){

}


module.exports = {
  tasks: function(key, dailyMax){
    console.log('here')
    var remainderForWeek = 0;
    var j = schedule.scheduleJob('* 12 * * *', function(){
      console.log('here too')
      remainderForWeek = calcFunctions.calculateRemainder(currentDailySpend, dailyMax)
      currentDailySpend = 0;
    });
    // var k = schedule.scheduleJob('0 17 * * 1', function(){
      var k = schedule.scheduleJob('* 12 * * *', function(){
      // remainder for week
      if (remainderForWeek >= 0){
        message = '!! Finished the week ' + calcFunctions.penceToPounds(remainderForWeek) + ' under budget!!';
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