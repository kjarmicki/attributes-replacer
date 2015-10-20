'use strict';

module.exports = {
    extractAttributeFromSelector: function(selector) {
        try {
            return selector.match(/\[([a-z]+)\]/)[1];
        }
        catch(e) {
            throw new Error('Error while parsing attribute from selector '  + selector);
        }
    }
};