var request = require('request');

module.exports = {
  post: function(message, key){
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
}
