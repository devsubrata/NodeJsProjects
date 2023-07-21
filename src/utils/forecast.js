const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fbf87e53973db4a26988c6c42d6771c1&query=${latitude},${longitude}`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            // console.log(body);

            const { temperature, feelslike, weather_descriptions, weather_icons } = body.current;
            const { name, region, country } = body.location;

            const weatherInfo = `${weather_descriptions[0]}. It's currently ${temperature}°C out, but temperature feels like ${feelslike}°C`;
            const locationInfo = `${name}, ${region}, ${country}`

            callback(error, { weatherInfo, locationInfo, img: weather_icons[0], coordinates: {latitude, longitude} });
        }
    })
}
module.exports = forecast;
