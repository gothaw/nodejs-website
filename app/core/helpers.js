const {API} = require('../config/constants');

/**
 * Returns API Key. If in production, it uses API keys stored in environment variables.
 * Otherwise it uses api keys stored in ./app/config/api.json
 * @param api {String} API key name from constants.js
 * @returns {String} API key
 */
const getAPIKey = api => {
    if (process.env.NODE_ENV === 'production') {
        switch (api) {
            case API.GOOGLE_PLACES:
                return process.env.PLACES_API_KEY;
            case API.WEATHER_API:
                return process.env.WEATHER_API_KEY;
            default:
                return '';
        }
    } else {
        const devKeys = require('../config/api.json');

        switch (api) {
            case API.GOOGLE_PLACES:
                return devKeys.PLACES_API_KEY;
            case API.WEATHER_API:
                return devKeys.WEATHER_API_KEY;
            default:
                return '';
        }
    }
}

module.exports.getAPIKey = getAPIKey;