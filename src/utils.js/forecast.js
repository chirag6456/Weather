const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/fc303ed4ad1921f81eaa230cea829fee/'+ latitude + ',' + longitude +'?units=si'

    request({ url, json : true}, (error, {body}) => {

        if(error){
            callback('Cannot connect to weather service', undefined)
        } else if(body.error) {
            callback('Cannot get weather for the location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees Celsius out. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast