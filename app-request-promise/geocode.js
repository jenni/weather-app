const request = require('request')

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

module.exports.geocodeAddress = geocodeAddress