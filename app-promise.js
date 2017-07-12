const axios = require('axios')
const yargs = require('yargs');


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

let encodedAdd = encodeURIComponent(argv.address);

let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}`

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  let lat = response.data.results[0].geometry.location.lat;
  let long = response.data.results[0].geometry.location.lng;
  let weatherUrl = `https://api.darksky.net/forecast/7e532c7f86e2d7f23479c9ad53882e35/${lat},${long}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
}).catch((err) => {
  if(err.code === 'ENOTFOUND'){
    console.log("Unable to connect to API server")
  } else {
    console.log(err.message);
  }
});
