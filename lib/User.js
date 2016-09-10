var calcFunctions = require('./calcFunctions'); 

function User(dailyTotal) {
  this.dailyTotal = dailyTotal;
  this.weeklyTotal = dailyTotal * 7;
  this.currentWeeklySpend = 0;
  this.formattedDailySpend = calcFunctions.penceToPounds(currentWeeklySpend);
  this.formattedWeeklyRemainder = calcFunctions.penceToPounds(weeklyTotal - currentWeeklySpend);
}

User.prototype.updateCurrentWeeklySpend = function(amountToAdd){
  this.currentWeeklySpend += amountToAdd;
}