const request = require('request')

request({
  url: 'https://api.darksky.net/forecast/4d2dbf21d0f15921b63d454991dd344f/52.52000659999999,13.404954',
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(body.currently.temperature)
  } else {
    console.log('Unable to fetch weather.')
  }
})

