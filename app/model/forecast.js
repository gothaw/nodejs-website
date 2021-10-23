const http = require('http');
const https = require('https');
const EventEmitter = require('events');

const api = require('../config/api.json');
const API_KEY = api.WEATHER_API_KEY;

/**
 *
 */
class Forecast extends EventEmitter {

    /**
     *
     * @param cityName
     */
    constructor(cityName) {
        super();
        let instanceContext = this;

        const request = https.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`, response => {
            let responseBody = '';

            if (response.statusCode !== 200) {
                request.destroy();
                instanceContext.emit('error', new Error(`There was an error getting forecast for ${cityName}: (${http.STATUS_CODES[response.statusCode]})`))
            }

            response.on('data', data => {
                responseBody += data.toString();
                instanceContext.emit('data', data);
            });

            response.on('end', () => {
                if (response.statusCode === 200) {
                    try {
                        // Parse data
                        const forecast = JSON.parse(responseBody);
                        instanceContext.emit('end', forecast)
                    } catch (error) {
                        instanceContext.emit('error', error)
                    }
                }
            });
        }).on('error', error => instanceContext.emit('error', error));
    }
}

module.exports = Forecast;
