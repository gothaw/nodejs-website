const http = require('http');
const https = require('https');
const EventEmitter = require('events');

const api = require('../config/api.json');
const API_KEY = api.WEATHER_API_KEY;

/**
 * Model for weather forecast. It takes weather forecast from https://www.weatherapi.com using the API_KEY stored in api.json config.
 */
class Forecast extends EventEmitter {

    /**
     * Constructor for weather forecast object. It takes city name and makes a request to API.
     * It uses https get method and parses the data to JSON object when data is received.
     * @param cityName {String} name of the city to be look
     */
    constructor(cityName) {
        super();

        const request = https.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`, response => {
            this._data = '';

            if (response.statusCode !== 200) {
                request.destroy();
                this.emit('error', new Error(`There was an error getting forecast for ${cityName}: (${http.STATUS_CODES[response.statusCode]})`))
            }

            response.on('data', data => {
                this._data += data.toString();
                this.emit('data', data);
            });

            response.on('end', () => {
                if (response.statusCode === 200) {
                    try {
                        // Parse data
                        const forecast = JSON.parse(this._data);
                        this.emit('end', forecast)
                    } catch (error) {
                        this.emit('error', error)
                    }
                }
            });
        }).on('error', error => this.emit('error', error));
    }

    /**
     * Getter for the forecast data
     * @returns {String}
     */
    get data() {
        return this._data;
    }
}

module.exports = Forecast;
