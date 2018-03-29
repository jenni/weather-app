const yargs = require('yargs')
const axios = require('axios')

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
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCg9x6K4-sf44jIWZV4xrNsViADbOPX_tA`

axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.')
    }

    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lng
    const weatherUrl = `https://api.darksky.net/forecast/4d2dbf21d0f15921b63d454991dd344f/${lat},${lng}`
    const location = response.data.results[0].formatted_address
    
    console.log(location)
    return axios.get(weatherUrl)
  })
  .then((response) => {
    const temperature = response.data.currently.temperature
    const apparentTemperature = response.data.currently.apparentTemperature

    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to api servers')
    } else {
      console.log(e.message)
    }
  })