const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon='+ longitude + '&appid=633a0f55d30a78fe394309d1caeda630&units=metric'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Temperature :' + body.main.temp + ' degree Celcius.')
        }
    })
}

module.exports = forecast