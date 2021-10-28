const Forecast = require('./forecast.js');

const forecast = new Forecast('London');

/**
 * To test run: node example_forecast.js
 */

/**
 * When the JSON body is fully recieved the
 * the 'end' event is triggered and the full body
 * is given to the handler or callback
 **/
forecast.on('end', console.dir);

/**
 * If a parsing, network or HTTP error occurs an
 * error object is passed in to the handler or callback
 **/
forecast.on('error', console.error);