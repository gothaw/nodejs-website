const http = require('http');
const https = require('https');
const EventEmitter = require('events');

const api = require('../config/api.json');
const API_KEY = api.WEATHER_API_KEY;

class CityImage extends EventEmitter {

    constructor(cityName) {
        super();

        const request = https.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${cityName}&key=${API_KEY}&inputtype=textquery&fields=name,photos`,
            response => {
                this._data = '';

                if (response.statusCode !== 200) {
                    request.destroy();
                    this.emit('error', new Error(`There was an error getting city image for ${cityName}: (${http.STATUS_CODES[response.statusCode]})`))
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
}