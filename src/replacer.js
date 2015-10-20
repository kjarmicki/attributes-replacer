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
                let ruleRegexp = new RegExp(rule.regexp);
                if(attributeValue.match(ruleRegexp)) {
                    element.setAttribute(attributeName, attributeValue.replace(ruleRegexp, rule.replace));
                    element[`__original_attribute_${attributeName}__`] = attributeValue;
                    return true;
                }
            })
        }
    });
};

let replaceBySelector = function(selector, rules) {
    let elements = [].slice.call(document.querySelectorAll(selector));
    let attributeName = utils.extractAttributeFromSelector(selector);

    return replace(elements, attributeName, rules);
};

module.exports = {
    replace: replace,
    replaceBySelector: replaceBySelector
};