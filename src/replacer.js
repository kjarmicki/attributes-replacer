/*
 * Finds and replaces elements' attributes based on regexps
 */

'use strict';

let utils = require('./utils');

let replace = function(elements, attributeName, rules) {
    elements.forEach(element => {
        let attributeValue = element.getAttribute(attributeName);
        if(attributeValue) {
            (rules || []).some(rule => {
                if(attributeValue.match(rule.regexp)) {
                    element.setAttribute(attributeName, attributeValue.replace(rule.regexp, rule.replace));
                    element[`__original_attribute_${attributeName}__`] = attributeValue;
                    return true;
                }
            });
        }
    });
};

let replaceBySelectors = function(selectors, rules, subtree) {
    subtree = subtree || document;
    selectors
        .reduce((replacements, selector) => {
            replacements.push({
                elements: [].slice.call(subtree.querySelectorAll(selector)),
                attributeName: utils.extractAttributeFromSelector(selector)
            });
            return replacements;
        }, [])
        .forEach(replacement => replace(replacement.elements, replacement.attributeName, rules));
};

module.exports = {
    replaceBySelectors: replaceBySelectors
};