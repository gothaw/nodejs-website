const Request = require('Request');

const api = require('../config/api.json');
const API_KEY = api.WEATHER_API_KEY;

/**
 * Model for weather forecast. It takes weather forecast from https://www.weatherapi.com using the API_KEY stored in api.json config.
 */
class Forecast extends Request {

    /**
     * Constructor for weather forecast object. It takes city name and makes a request to API.
     * It uses https get method and parses the data to JSON object when data is received.
     * @param cityName {String} name of the city to be look
     */
    constructor(cityName) {
        super();
        // const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`;
        // const errorMessage = `There was an error getting forecast for ${cityName}`;
        console.log('constructor');
        // super();
        this.makeRequest(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`, `There was an error getting forecast for ${cityName}`);
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
