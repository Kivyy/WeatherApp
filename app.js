const request = require('request');
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

let encodedAdd = encodeURIComponent(argv.a)

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}`,
  json: true
}, (err,res,body)=> {
  if(err){
    console.log("Unable to connect to Google servers.");
  }else if (body.status === 'ZERO_RESULTS'){
    console.log("Unable to find that address");
  } else if(body.status === 'OK') {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Lat: ${body.results[0].geometry.location.lat}`);
    console.log(`Lng: ${body.results[0].geometry.location.lng}`);
  }
});
