const request = require('request')
const yargs = require('yargs')

// $ node app.js --address 'Kantstr. 1'
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

const address = encodeURIComponent(argv.address)

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`)
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
})