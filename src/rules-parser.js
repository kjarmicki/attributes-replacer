'use strict';

let textParser = require('./text-parser');

let parse = function(text) {
    return textParser
        .parse(text)
        .map(line => line.split('=>').map(property => property.trim()))
        .map(properties => {
            return {
                regexp: properties[0], replace: properties[1]
            };
        });
};

module.exports = {
    parse: parse
};