const querystring = require('querystring');
const accents = require('remove-accents');

const constants = require('../config/constants');
const renderer = require('../core/renderer');

const {COMMON_HEADERS, HTTP} = constants;

/**
 * Handles GET request on the search page which is accessed via '/' route.
 * It serves relevant HTML files.
 * @param response {Object} server response
 */
const handleGetRequest = response => {
    response.writeHead(200, COMMON_HEADERS);
    renderer.view('header', {}, response);
    renderer.view('search', {}, response);
    renderer.view('footer', {}, response);
    response.end();
};

/**
 * Handles POST request when submitting search form. It redirects to /cityName route.
 * @param request {Object} POST request
 * @param response {Object} server response
 */
const handlePostRequest = (request, response) => {
    request.on('data', postBody => {
        const query = querystring.parse(accents.remove(postBody.toString()));
        response.writeHead(303, {'Location': `/${query.cityName.toLowerCase()}`});
        response.end();
    })
};

/**
 * Handles routes on home page. Depending on the method it uses handleGetRequest or handlePostRequest.
 * @param request {Object} GET or POST request
 * @param response {Object} server response
 */
const route = (request, response) => {
    const method = request.method.toLowerCase();

    switch (method) {
        case HTTP.GET:
            handleGetRequest(response);
            break;
        case HTTP.POST:
            handlePostRequest(request, response)
            break;
        default:
            return;
    }
};

module.exports.route = route;