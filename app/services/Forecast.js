const Request = require('./Request.js');

const api = require('../config/api.json');
const API_KEY = api.WEATHER_API_KEY;
const { WEATHER_API_CURRENT_FORECAST_URL } = require('../config/constants');

/**
 * Model for weather forecast. It gets weather forecast from https://www.weatherapi.com using the API_KEY stored in api.json config.
 */
class Forecast extends Request {

    /**
     * Constructor for weather forecast object. It takes city name and makes a request to API.
     * It uses Request class to make a request.
     * @param cityName {String} name of the city to be look up
     */
    constructor(cityName) {
        super(`${WEATHER_API_CURRENT_FORECAST_URL}?key=${API_KEY}&q=${cityName}&aqi=no`, `There was an error getting forecast for ${cityName}`);
        this._city = cityName;
    }

    /**
     * Getter for the city name.
     * @returns {String}
     */
    get city() {
        return this._city;
    }
}

module.exports = Forecast;
