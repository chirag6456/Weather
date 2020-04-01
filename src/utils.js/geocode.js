const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiY2hpcmFnNjQ1NiIsImEiOiJjazhhNHAxYmowY3hkM2hwa20zc3kwbHpqIn0.D2rvnGrXT5MQTrINksKt-Q&limit=1'
    request({ url : url, json : true}, (error, {body}) => {
        
        if(error){
            callback('Unable to connect to location service.', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another location.', undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                address : body.features[0].place_name
            })
        }
    }
    )
}

module.exports = geoCode