const yargs = require('yargs')

const geocode = require('./geocode')
const darksky = require('./darksky')

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

geocode.geocodeAddress(argv.address)
  .then((location) => {
    console.log(JSON.stringify(location.address, undefined, 2))
    return darksky.getWeather(location.latitude, location.longitude)
  })
  .then((response) => {
    console.log(`It's currently ${response.temperature}. It feels like ${response.apparentTemperature}.`)
  })
  .catch((errorMessage) => {
    console.log(errorMessage)
  })
