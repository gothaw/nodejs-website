const http = require('http');
const https = require('https');
const EventEmitter = require('events');

class Request extends EventEmitter {

    constructor(url, failedRequestErrorMessage) {
        super();

        const request = https.get(url, response => {
            this._data = '';

            if (response.statusCode !== 200) {
                request.destroy();
                this.emit('error', new Error(`${failedRequestErrorMessage}: (${http.STATUS_CODES[response.statusCode]})`))
            }

            response.on('data', data => {
                this._data += data.toString();
                this.emit('data', data);
            });

            response.on('end', () => {
                if (response.statusCode === 200) {
                    try {
                        // Parse data
                        const data = JSON.parse(this._data);
                        this.emit('end', data)
                    } catch (error) {
                        this.emit('error', error)
                    }
                }
            });
        }).on('error', error => this.emit('error', error));
    }

    get data() {
        return this._data;
    }
}

module.exports = Request;
