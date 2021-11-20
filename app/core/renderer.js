const fs = require('fs');

/**
 * Function that binds variables in html template. The variables in the template should have format: {{variableName}}
 * @param values {Object} object with key value pairs { variable: 'value' }
 * @param content {String} HTML file content with template variables
 * @returns {String} HTML file content with bound values
 */
const bindValues = (values, content) => {
    for (let key in values) {
        content = content.replace(`{{${key}}}`, values[key]);
    }

    return content;
};

/**
 * Function used for serving HTML files and writing them in the http response.
 * It also replaces template variables with provided values using bindValues function.
 * @param name {String} name of the file in app/views directory
 * @param values {Object} includes values to be added to the template
 * @param response {Object} server response object
 */
const view = (name, values, response) => {
    // Read from the template file
    const fileContents = fs.readFileSync(`./app/views/${name}.html`, {encoding: 'utf8'});
    // Insert values in to the content
    const mergedContent = bindValues(values, fileContents);
    // Write out the contents to the response
    response.write(mergedContent);
};

module.exports.view = view;