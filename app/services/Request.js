const http = require('http');
const https = require('https');
const EventEmitter = require('events');

const {MESSAGES} = require('../config/constants');

/**
 * Class used for making a request with a given url.
 */
class Request extends EventEmitter {

    /**
     * Constructor for the request object. It uses https get method to make a request and parses the data to JSON object when data is received.
     * Finally, It emits the data using emit method on EventEmitter.
     * If request fails it throws an error with failedRequestErrorMessage and with the response status code.
     * @param url {String} url to make a request to
     * @param failedRequestErrorMessage {String} message when requests fails
     */
    constructor(url, failedRequestErrorMessage = MESSAGES.DEFAULT_REQUEST_ERROR_MESSAGE) {
        super();

        const request = https.get(url, response => {
            this._data = '';

            console.log(response.statusCode);
            if (response.statusCode !== 200 && response.statusCode !== 302) {
                request.destroy();
                this.emit('error', new Error(`${failedRequestErrorMessage}: (${http.STATUS_CODES[response.statusCode]})`))
            }

            response.on('data', data => {
                this._data += data.toString();
                this.emit('data', data);
            });

            response.on('end', () => {
                if (response.statusCode === 200 || response.statusCode === 302) {
                    try {
                        // Parse data
                        console.log(this._data.toString());
                        const data = JSON.parse(this._data);
                        this.emit('end', data);
                    } catch (error) {
                        this.emit('error', error);
                    }
                }
            });
        }).on('error', error => this.emit('error', error));
    }

    /**
     * Getter for the data field
     * @returns {String}
     */
    get data() {
        return this._data;
    }
}

module.exports = Request;
