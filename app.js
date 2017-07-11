const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true,
  }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.a, (errMessage,results) => {
  if (errMessage){
    console.log(errMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude, (errMessage, weatherResults) => {
      if(errMessage){
        console.log(errMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`)
      }
    });
  }
});
