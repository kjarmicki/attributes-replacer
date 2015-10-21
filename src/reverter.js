'use strict';

let utils = require('./utils');

let revert = function(elements, attributeName) {
    elements.forEach(element => {
        if(element[`__original_attribute_${attributeName}__`] !== undefined) {
            element.setAttribute(attributeName, element[`__original_attribute_${attributeName}__`]);
        }
    });
};

let revertBySelectors = function(selectors) {
    selectors
        .reduce((reverts, selector) => {
            reverts.push({
                elements: [].slice.call(document.querySelectorAll(selector)),
                attributeName: utils.extractAttributeFromSelector(selector)
            });
            return reverts;
        }, [])
        .forEach(rev => revert(rev.elements, rev.attributeName));
};

module.exports = {
    revertBySelectors: revertBySelectors
};