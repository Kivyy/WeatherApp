const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode')

// const argv = yargs
//   .options({
//   a: {
//     demand: true,
//     alias: 'address',
//     describe: 'Address to fetch weather for',
//     string: true,
//   }
// })
// .help()
// .alias('help', 'h')
// .argv;
//
// geocode.geocodeAddress(argv.a, (errMessage,results) => {
//   if (errMessage){
//     console.log(errMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2))
//   }
// });

// 7e532c7f86e2d7f23479c9ad53882e35

request({
  url: "https://api.darksky.net/forecast/7e532c7f86e2d7f23479c9ad53882e35/39.9350642,-75.1516194",
  json: true,
},(err,result,body) => {
  if(!err && result.statusCode === 200) {
    console.log(body.currently.temperature);
  } else {
    console.log('Unable to fetch weather.')
  }
})
