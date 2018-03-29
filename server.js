const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null })
})

app.post('/', (req, res) => {
  let address = req.body.city
  let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCg9x6K4-sf44jIWZV4xrNsViADbOPX_tA`

  axios.get(geocodeUrl)
    .then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.')
      }

      const lat = response.data.results[0].geometry.location.lat
      const lng = response.data.results[0].geometry.location.lng
      const weatherUrl = `https://api.darksky.net/forecast/4d2dbf21d0f15921b63d454991dd344f/${lat},${lng}`
      const location = response.data.results[0].formatted_address

      return axios.get(weatherUrl)
    })
    .then((response) => {
      const weather = response.data.currently.temperature
      const apparentTemperature = response.data.currently.apparentTemperature
      const message = `It's currently ${weather}. It feels like ${apparentTemperature}.`

      res.render('index', { weather: message, error: null })
    })
    .catch((e) => {
      if (e.code === 'ENOTFOUND') {
        res.render('index', { weather: null, error: 'Unable to connect to api servers' })
      } else {
        res.render('index', { weather: null, error: e.message })
      }
    })

})

app.listen(3000, () => {
  console.log('App up and running!')
})