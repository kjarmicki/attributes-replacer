'use strict';

let utils = require('./utils');

let revert = function(elements, attributeName) {
    elements.forEach(element => {
        if(element[`__original_attribute_${attributeName}__`] !== undefined) {
            element.setAttribute(attributeName, element[`__original_attribute_${attributeName}__`])
        }
    });
};

let revertBySelector = function(selector) {
    let elements = [].slice.call(document.querySelectorAll(selector));
    let attributeName = utils.extractAttributeFromSelector(selector);

    return revert(elements, attributeName);
};

module.exports = {
    revert: revert,
    revertBySelector: revertBySelector
};