const request = require('request')

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/4d2dbf21d0f15921b63d454991dd344f/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, { 
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather.')
    }
  })
}

module.exports.getWeather = getWeather