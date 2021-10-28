const homeRoute = require('../api-routes/home');
const forecastRoute = require('../api-routes/forecast');

const home = (request, response) => {
    if (request.url === '/') {
        homeRoute.route(request, response);
    }
};

const forecast = (request, response) => {
    const cityName = request.url.replace('/', '');

    if (cityName.length > 0) {
        forecastRoute.route(request, response, cityName);
    }
};

module.exports.home = home;
module.exports.forecast = forecast;