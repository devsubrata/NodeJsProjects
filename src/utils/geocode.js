const request = require('request');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=057dc0ee2cd3e3e41474ea1b4bc72c91&query=${encodeURIComponent(address)}&limit=1`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (!body.data || body.data.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { latitude, longitude } = body.data[0];
            callback(undefined, { latitude, longitude })
        }
    })
}
module.exports = geocode;
