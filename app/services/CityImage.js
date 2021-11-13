const Request = require('./Request.js');

const api = require('../config/api.json');
const API_KEY = api.PLACES_API_KEY;
const {GOOGLE_PLACES_API_URL} = require('../config/constants');

/**
 * Model for the City Image. It gets a image in Google Places API using the API_KEY stored in api.json config.
 */
class CityImage extends Request {

    /**
     * Constructor for city image object. It takes city name and makes a request to API.
     * It uses Request class to make a request.
     * @param cityName {String} name of the city to be look up
     */
    constructor(cityName) {
        super(`${GOOGLE_PLACES_API_URL}?input=${cityName}&key=${API_KEY}&inputtype=textquery&fields=name,photos`, `There was an error getting city image for ${cityName}`);
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

module.exports = CityImage;
