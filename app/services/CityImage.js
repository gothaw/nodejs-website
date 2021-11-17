const Request = require('./Request.js');
const EventEmitter = require('events');

const api = require('../config/api.json');
const API_KEY = api.PLACES_API_KEY;
const {URLS, MESSAGES} = require('../config/constants');

/**
 * Model for the City Image. It gets a image in Google Places API using the API_KEY stored in api.json config.
 */
class CityImage extends EventEmitter {

    /**
     * Constructor for city image object. It takes city name and makes a request to API.
     * It uses Request class to make a request.
     * @param cityName {String} name of the city to be look up
     */
    constructor(cityName) {
        super();
        const failedRequestMessage = `There was an error getting city image for ${cityName}`;

        const photoReferenceResponse = new Request(`${URLS.GOOGLE_PLACES_FIND_PLACE}?input=${cityName}&key=${API_KEY}&inputtype=textquery&fields=name,photos`, failedRequestMessage);
        photoReferenceResponse.on('end', response => {

            const photoReference = response?.candidates[0]?.photos[0]?.photo_reference;

            if (!photoReference) {
                this.emit('error', new Error(MESSAGES.NO_IMAGE_FOUND))
            }

            const cityImage = new Request(`${URLS.GOOGLE_PLACES_PHOTO}?photoreference=${photoReference}&key=${API_KEY}&maxwidth=400&maxheight=400`, failedRequestMessage, true, false);
            cityImage.on('end', (data) => {
                // regex to find the url
                const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
                const imageUrls = data.match(regex);

                if (imageUrls.length) {
                    // emitting first image that is found
                    this.emit('end', imageUrls[0]);
                } else {
                    this.emit('error', new Error(MESSAGES.NO_IMAGE_FOUND));
                }
            });
            cityImage.on('error', error => this.emit('error', error));
        });
        photoReferenceResponse.on('error', error => this.emit('error', error));
    }

    /**
     * Getter for the city name.
     * @returns {String}
     */
    get city() {
        return this._city;
    }
}

module.exports = CityImage;
