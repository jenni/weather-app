const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const darksky = require('./weather/darksky')

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

geocode.geocodeAddress(argv.address, (err, res) => {
  if (err) {
    console.log(err)
  } else {
    darksky.getWeather(res.latitude, res.longitude, (err, weatherRes) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`It's currently ${weatherRes.temperature} in ${res.address}. It feels like ${weatherRes.apparentTemperature}.`)
      }
    })
  }
})