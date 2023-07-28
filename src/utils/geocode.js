const axios = require('axios');

const geocode = async (address, callback) => {
    try {
        const config = {
            method: 'get',
            url: `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=162407ddd49d41d68feee4a7599bfbe7`,
            headers: { }
        };
        const response = await axios(config);
        const results = response.data.features[0];
        console.log(results);

        const { lat: latitude, lon: longitude, formatted: location } = results.properties;
        console.log({latitude, longitude, location});

        callback(undefined, {latitude, longitude});
    }
    catch (error) {
        console.log('Error!', error.message);
        
        callback(`Error! ${error.message}.`, undefined)
    }
}
module.exports = geocode;


// const request = require('request');

// const geocode = (address, callback) => {
//     const url = `http://api.positionstack.com/v1/forward?access_key=057dc0ee2cd3e3e41474ea1b4bc72c91&query=${encodeURIComponent(address)}&limit=1`;
//     request({url, json: true}, (error, {body}) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined);
            
//         } else if (body.error.message) {
//             callback(body.error.message, undefined);

//         } else if (!body.data || body.data.length === 0) {
//             console.log(body);
//             callback('Unable to find location. Try another search.', undefined);

//         } else {
//             // console.log(body);
//             const { latitude, longitude } = body.data[0];
//             callback(undefined, { latitude, longitude })
//         }
//     })
// }
// module.exports = geocode;
