const request = require('request');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=057dc0ee2cd3e3e41474ea1b4bc72c91&query=${encodeURIComponent(address)}&limit=1`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.data.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { latitude, longitude, label} = body.data[0];
            callback(undefined, { latitude, longitude, location: label })
        }
    })
}
module.exports = geocode;



// const request = require('request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: body.features[0].center[1],
//                 longitude: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geocode