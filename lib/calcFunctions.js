module.exports = {
  calculateRemainder: function(currentDailySpend, dailyMaxSpend){
    console.log('here 3!')
    var weeklyTotal = dailyMaxSpend * 7;
    console.log('weeklyTotal: ' + weeklyTotal)
    var weeklyRemainder = 0
    console.log('currentdailyspend: ' + currentDailySpend)
    console.log('dailyMaxSpend: ' + dailyMaxSpend)
    if (currentDailySpend <= dailyMaxSpend){
      weeklyRemainder += (dailyMaxSpend - currentDailySpend);
      console.log('remainder: ' + weeklyRemainder)
      return weeklyTotal - weeklyRemainder
    }
    else return weeklyTotal - weeklyRemainder
  },
  penceToPounds: function(pence){
    var pounds = pence / 100
    return '£' + pounds.toFixed(2);
  }
}