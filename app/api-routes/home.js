const querystring = require('querystring');

const constants = require('../config/constants');
const renderer = require('../core/renderer');

const {COMMON_HEADERS, HTTP} = constants;

const handleGetRequest = response => {
    response.writeHead(200, COMMON_HEADERS);
    renderer.view('header', {}, response);
    renderer.view('search', {}, response);
    renderer.view('footer', {}, response);
    response.end();
};

const handlePostRequest = (request, response) => {
    request.on('data', postBody => {
        const query = querystring.parse(postBody.toString());
        response.writeHead(303, {'Location': `/${query.cityName}`});
        response.end();
    })
};

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