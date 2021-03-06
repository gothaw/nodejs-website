const express = require('express');

const homeRoute = require('./api-routes/home');
const forecastRoute = require('./api-routes/forecast');

const app = express();

app.use(express.static(__dirname.substr(0, __dirname.lastIndexOf('app')) + 'public'));

app.get('/', (request, response) => {
    homeRoute.route(request, response);
});

app.post('/', (request, response) => {
    homeRoute.route(request, response);
});

app.get('/:city', (request, response) => {
    forecastRoute.route(request, response);
});

app.listen(process.env.PORT || 8080);