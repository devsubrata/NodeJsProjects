const axios = require('axios');

const forecast = async (latitude, longitude, callback) => {
    try {
        const config = {
            method: 'get',
            url: `http://api.weatherstack.com/current?access_key=fbf87e53973db4a26988c6c42d6771c1&query=${latitude},${longitude}`,
            headers: { }
        };
        const response = await axios(config);
        console.log(response);

        const { temperature, feelslike, weather_descriptions, weather_icons } = response.data.current;
        const { name, region, country } = response.data.location;

        const weatherInfo = `${weather_descriptions[0]}. It's currently ${temperature}°C out, but temperature feels like ${feelslike}°C`;
        const locationInfo = `${name}, ${region}, ${country}`

        callback(undefined, { weatherInfo, locationInfo, img: weather_icons[0], coordinates: {latitude, longitude} });
        
        
    }
    catch (error) {
        console.log('Error!', error.message);

        callback(`Error! ${error.message}.`, undefined)
    }
}
module.exports = forecast;

// const forecast = (latitude, longitude, callback) => {
//     const url = `http://api.weatherstack.com/current?access_key=fbf87e53973db4a26988c6c42d6771c1&query=${latitude},${longitude}`;
//     request({url, json: true}, (error, {body}) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined);

//         }else if (body.error.code === 104) {
//             callback('usage_limit_reached', undefined); 

//         } else if (body.error) {
//             callback('Unable to find location.', undefined);

//         } else {
//             console.log(body);

//             const { temperature, feelslike, weather_descriptions, weather_icons } = body.current;
//             const { name, region, country } = body.location;

//             const weatherInfo = `${weather_descriptions[0]}. It's currently ${temperature}°C out, but temperature feels like ${feelslike}°C`;
//             const locationInfo = `${name}, ${region}, ${country}`

//             callback(error, { weatherInfo, locationInfo, img: weather_icons[0], coordinates: {latitude, longitude} });
//         }
//     })
// }
// module.exports = forecast;
