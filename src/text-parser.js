'use strict';

let parse = function(text) {
    return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => {
            return line.length > 0 && line.indexOf('//') !== 0;
        });
};

module.exports = {
    parse: parse
};