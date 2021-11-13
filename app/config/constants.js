const COMMON_HEADERS = {'Content-Type': 'text/html'};

const HTTP = {
    GET: 'get',
    POST: 'post'
};

const DEFAULT_REQUEST_ERROR_MESSAGE = 'There was en error making a request';
const WEATHER_API_CURRENT_FORECAST_URL = 'https://api.weatherapi.com/v1/current.json';
const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

module.exports = {
    COMMON_HEADERS,
    DEFAULT_REQUEST_ERROR_MESSAGE,
    WEATHER_API_CURRENT_FORECAST_URL,
    GOOGLE_PLACES_API_URL,
    HTTP
}