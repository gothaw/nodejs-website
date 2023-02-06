# nodejs-website

A simple node.js application that uses [Weather API](https://www.weatherapi.com) to get the current weather forecast for a city entered by a user. It also uses [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) to get a typical photo from that city. If no photo is found it serves a placeholder image.

The app uses Express framework, however, it was purely used for allowing to serve static content and the most of the application was built with vanilla Node.js.

To run the app in local environment create the free counts for both Google Places API and Weather API and obtain API keys. Then create `api.json` file inside `app/config`. This should contain both API keys as such:

```json
{
"WEATHER_API_KEY": "YOUR_API_KEY_FOR_WEATHER_API",
"PLACES_API_KEY": "YOUR_API_KEY_FOR_GOOGLE_PLACES_API"
}
```
In addition enable google api in config.js.

### Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

`npm run wp:prod`

It creates minified and uglified `main.css` stylesheet from .scss files

`npm run wp:dev`

It creates `main.css` file and updates it in development mode if changes are made to .scss files.

### Deployment

Deployment has been carried out using [heroku](https://heroku.com).
To deploy the app install heroku and follow the latest documentation available [here](https://devcenter.heroku.com/articles/git).

Remember to add `WEATHER_API_KEY` and `PLACES_API_KEY` in Settings -> Config Vars.

Please note that the deployed build has Google API disabled as this was using trial version that is bound to expire in the future. 

### Built with

HTML5, SCSS, JavaScript, Node.js

#### Frameworks:

Express

### Authors

Radoslaw Soltan

### License

This project is under the MIT License - see the LICENSE.md file for details.

### Browser Support

Extensive compatibility checks with different browsers have not been carried out. The website should be supported by most modern browsers, however, additional coding has to be done for the support of IE.

### Acknowledgment 

The project is not for commercial use, and I do not own any of the assets shown on the website.

The app uses Google Places API for city images. All other assets not requested from the API were taken from [Flaticon](https://www.flaticon.com) website.

