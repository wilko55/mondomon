var assert = require('assert');
var calcFunctions = require('../../lib/calcFunctions');

describe('The penceToPounds function', function() {
  
  it('should turn 1230 pence into £12.30', function() {
    var expectedResult = "£12.30";
    var actualResult = calcFunctions.penceToPounds('1230')
    assert.equal(actualResult, expectedResult);
  });

});

describe('The calculateRemainder function', function() {
  
  it('should calculate the remainder when spending under daily max', function() {
    var dailyMaxSpend = 1200;
    var remainderForWeek = 0;
    var expectedResult = 50;
    var actualResult = calcFunctions.calculateRemainder(1150, dailyMaxSpend, remainderForWeek)
    assert.equal(actualResult, expectedResult);
  });
  it('should calculate the remainder when spending over daily max', function() {
    var dailyMaxSpend = 1200;
    var remainderForWeek = 0;
    var expectedResult = 0;
    var actualResult = calcFunctions.calculateRemainder(1300, dailyMaxSpend, remainderForWeek)
    assert.equal(actualResult, expectedResult);
  });

  it('should calculate the remainder when spending over daily 2', function() {
    var dailyMaxSpend = 1200;
    var remainderForWeek = 900;
    var expectedResult = 1000;
    var actualResult = calcFunctions.calculateRemainder(1100, dailyMaxSpend, remainderForWeek)
    assert.equal(actualResult, expectedResult);
  });

});