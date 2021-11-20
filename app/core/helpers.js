const {API} = require('../config/constants');

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