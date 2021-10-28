const fs = require('fs');

const bindValues = (values, content) => {
    for (let key in values) {
        content = content.replace(`{{${key}}}`, values[key]);
    }

    return content;
};

const view = (name, values, response) => {
    // Read from the template file
    const fileContents = fs.readFileSync(`../views/${name}.html`, {encoding: 'utf8'});
    // Insert values in to the content
    const mergedContent = bindValues(values, fileContents);
    // Write out the contents to the response
    response.write(mergedContent);
};

module.exports.view = view;