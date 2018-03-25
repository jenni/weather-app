const request = require('request')

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=25%20schudomastr%20berlin&key=AIzaSyCg9x6K4-sf44jIWZV4xrNsViADbOPX_tA',
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2))
})

