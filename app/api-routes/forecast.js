const querystring = require('querystring');

const constants = require('../config/constants');
const renderer = require('../core/renderer');
const Forecast = require('../services/forecast');

const {COMMON_HEADERS, HTTP} = constants;

const route = (request, response, cityName) => {
    const method = request.method.toLowerCase();

    if (method === HTTP.GET) {
        response.writeHead(200, COMMON_HEADERS);
        renderer.view('header', {}, response);

        const forecast = new Forecast(cityName);

        forecast.on('end', forecastJSON => {
            const values = {
                name: forecastJSON.location.name,
                // country: forecastJSON.location.country
                temperature: forecastJSON.current.temp_c,
                // humidity: forecastJSON.current.humidity,
                // wind: forecastJSON.current.wind_kph,
                image: '../views/city.png'
                // condition: forecastJSON.current.condition.text
            };

            // simple response
            renderer.view('forecast', values, response);
            renderer.view('footer', {}, response);
            response.end();
        });

        forecast.on('error', error => {
            renderer.view('error', {errorMessage: error.message}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        });
    }

};

module.exports.route = route;