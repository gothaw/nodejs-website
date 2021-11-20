const Request = require('./Request.js');

const {getAPIKey} = require('../core/helpers');
const {API, URLS} = require('../config/constants');

const API_KEY = getAPIKey(API.WEATHER_API);

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
        super(`${URLS.WEATHER_API_CURRENT_FORECAST}?key=${API_KEY}&q=${cityName}&aqi=no`, `There was an error getting forecast for ${cityName}`);
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
