module.exports = {
  penceToPounds: function(pence){
    var pounds = pence / 100
    return '£' + pounds.toFixed(2);
  }
}