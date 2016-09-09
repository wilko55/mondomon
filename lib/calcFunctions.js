module.exports = {
  calculateRemainder: function(currentDailySpend, dailyMaxSpend, remainderForWeek){
    if (currentDailySpend <= dailyMaxSpend){
      remainderForWeek += (dailyMaxSpend - currentDailySpend);
      return remainderForWeek
    }
    else return remainderForWeek
  },
  penceToPounds: function(pence){
    var pounds = '£' + pence / 100
    return pounds.length - pounds.indexOf('.') == 3 ?  pounds : pounds + '0';
  }
}