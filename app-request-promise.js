const yargs = require('yargs')
const request = require('request')

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

const geocodeAddress = (input) => {
  const address = encodeURIComponent(input)

  return new Promise((resolve, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCg9x6K4-sf44jIWZV4xrNsViADbOPX_tA`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers.')
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.')
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    })
  })
}

const getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/4d2dbf21d0f15921b63d454991dd344f/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve({ 
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        })
      } else {
        reject('Unable to fetch weather.')
      }
    })
  })
}

geocodeAddress(argv.address)
  .then((location) => {
    console.log(JSON.stringify(location.address, undefined, 2))
    return getWeather(location.latitude, location.longitude)
  })
  .then((response) => {
    console.log(`It's currently ${response.temperature}. It feels like ${response.apparentTemperature}.`)
  })
  .catch((errorMessage) => {
    console.log(errorMessage)
  })
