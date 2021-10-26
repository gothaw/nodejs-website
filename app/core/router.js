const querystring = require('querystring');

const Forecast = require('./profile');
const renderer = require('./renderer');

const commonHeaders = {'Content-Type': 'text/html'};

const home = (request, response) => {
    if (request.url === '/') {
        if (request.method.toLowerCase() === 'get') {
            response.writeHead(200, commonHeaders);
            renderer.view('header', {}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        } else {
            request.on('data', postBody => {
                const query = querystring.parse(postBody.toString());
                response.writeHead(303, {'Location': `/${query.username}`});
                response.end();
            })
        }
    }
};

const user = (request, response) => {
    const userName = request.url.replace('/', '');

    if (userName.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view('header', {}, response);

        const studentProfile = new Profile(userName);

        studentProfile.on('end', profileJSON => {
            // show profile 'chalkers', 'romerican'

            // store the values we need
            const values = {
                avatarUrl: profileJSON.gravatar_url,
                userName: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };

            // simple response
            renderer.view('profile', values, response);
            renderer.view('footer', {}, response);
            response.end();
        });

        studentProfile.on('error', error => {
            renderer.view('error', {errorMessage: error.message}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        });
    }
};

module.exports.home = home;
module.exports.user = user;