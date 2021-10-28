const http = require('http');

const router = require('./core/router');

const server = http.createServer((request, response) => {
    router.home(request, response);
    router.forecast(request, response);
});

server.listen(8080);