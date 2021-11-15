const COMMON_HEADERS = {'Content-Type': 'text/html'};

const HTTP = {
    GET: 'get',
    POST: 'post'
};

const MESSAGES = {
    DEFAULT_REQUEST_ERROR_MESSAGE: 'There was en error making a request'
}

const URLS = {
    WEATHER_API_CURRENT_FORECAST : 'https://api.weatherapi.com/v1/current.json',
    GOOGLE_PLACES_FIND_PLACE : 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
    GOOGLE_PLACES_PHOTO : 'https://maps.googleapis.com/maps/api/place/photo'
}


module.exports = {
    COMMON_HEADERS,
    MESSAGES,
    URLS,
    HTTP
}