const constants = require('../config/constants');
const renderer = require('../core/renderer');
const Forecast = require('../services/Forecast');
const CityImage = require('../services/CityImage');

const {COMMON_HEADERS} = constants;

/**
 * Handles weather forecast GET request for /cityName route.
 * It creates a Forecast object based on the cityName and then uses the values received from the API in the HTML templates.
 * Finally, it writes HTML files to the response.
 * If the cityName was not found in the API it shows a toast error.
 * @param request {Object} GET request
 * @param response {Object} server response
 */
const route = (request, response) => {
    const cityName = request.url.replace('/', '');

    if (cityName.length > 0) {
        response.writeHead(200, COMMON_HEADERS);
        renderer.view('header', {}, response);

        const forecast = new Forecast(cityName);

        forecast.on('end', async forecastJSON => {
            const {current, location} = forecastJSON;

            const values = {
                name: location?.name,
                country: location?.country,
                localTime: location?.localtime?.split(' ')[1],
                condition: current?.condition.text,
                temperature: current?.temp_c,
                humidity: current?.humidity,
                pressure: current?.pressure_mb,
                wind: current?.wind_kph
            };

            const cityImage = new CityImage(cityName);

            cityImage.on('end', imageURL => {
                values.cityImage = imageURL

                renderForecast(values, response);
                response.end();
            })

            cityImage.on('error', () => {
                values.cityImage = './dist/img/city.png';

                renderForecast(values, response);
                response.end();
            });
        });

        forecast.on('error', error => {
            renderer.view('error', {errorMessage: error.message}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        });
    }

};

const renderForecast = (values, response) => {
    renderer.view('forecast', values, response);
    renderer.view('footer', {}, response);
};

module.exports.route = route;