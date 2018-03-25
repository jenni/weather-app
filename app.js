const request = require('request')

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=25%20schudomastr%20berlin',
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2))
})

