var calcFunctions = require('./calcFunctions'); 

  var User = function(dailyMaxSpend, currentDailySpend) {
    this.dailyMaxSpend = dailyMaxSpend || 1200;
    this.weeklyMaxSpend = dailyMaxSpend * 7;
    this.weeklyTotalSpend = 0;
    this.dailyRemainder = 0;
    this.currentDailySpend = !!currentDailySpend ? currentDailySpend : 0;
  }

  User.prototype.updateCurrentDailySpend = function(amountToAdd){
    this.currentDailySpend += amountToAdd;
    console.log('new currentdailyspend: ' + this.currentDailySpend)
  }

  User.prototype.formattedDailySpend = function(){
    return calcFunctions.penceToPounds(this.currentDailySpend);
  }

  User.prototype.getWeeklyRemainder = function(){
    return calcFunctions.penceToPounds(this.weeklyMaxSpend - this.weeklyTotalSpend);
  }

module.exports = {
  User:User
}