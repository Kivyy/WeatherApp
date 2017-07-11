const request = require('request');

let getWeather = (lat,long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/7e532c7f86e2d7f23479c9ad53882e35/${lat},${long}`,
    json: true
  },(err,result,body) => {
    if(err){
      callback("Unable to fetch weather")
    } else if(result.statusCode === 400){
      callback("Unable to find address")
    } else if(result.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      })
    }
  });
}

module.exports = {
  getWeather,
}
