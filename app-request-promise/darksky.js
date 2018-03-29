const request = require('request')

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

module.exports.getWeather = getWeather