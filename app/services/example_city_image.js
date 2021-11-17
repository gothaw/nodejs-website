const CityImage = require('./CityImage.js');

const cityImage = new CityImage('London');

/**
 * To test run: node example_city_image.js
 */

/**
 * When the JSON body is fully recieved the
 * the 'end' event is triggered and the full body
 * is given to the handler or callback
 **/
cityImage.on('end', console.log);

/**
 * If a parsing, network or HTTP error occurs an
 * error object is passed in to the handler or callback
 **/
cityImage.on('error', console.error);