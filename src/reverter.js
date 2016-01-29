'use strict';

let utils = require('./utils');

let revert = function(elements, attributeName) {
    elements.forEach(element => {
        let mark = `__original_attribute_${attributeName}__`;
        if(element[mark] !== undefined) {
            element.setAttribute(attributeName, element[mark]);
            delete element[mark];
        }
    });
};

let revertBySelectors = function(selectors) {
    selectors
        .reduce((reverts, selector) => {
            reverts.push({
                elements: Array.from(document.querySelectorAll(selector)),
                attributeName: utils.extractAttributeFromSelector(selector)
            });
            return reverts;
        }, [])
        .forEach(rev => revert(rev.elements, rev.attributeName));
};

module.exports = {
    revertBySelectors: revertBySelectors
};