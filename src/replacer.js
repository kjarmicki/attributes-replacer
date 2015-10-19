/*
 * Finds and replaces elements' attributes based on regexps
 */

'use strict';

let extractAttributeFromSelector = function(selector) {
    try {
        return selector.match(/\[([a-z]+)\]/)[1];
    }
    catch(e) {
        console && console.error('Error while parsing attribute from selector '  + selector);
    }
};

let replace = function(elements, attributeName, rules) {
    elements.forEach(element => {
        let attr = element.getAttribute(attributeName);
        if(attr) {
            (rules || []).some(rule => {
                let ruleRegexp = new RegExp(rule.regexp);
                if(attr.match(ruleRegexp)) {
                    element.setAttribute(attributeName, attr.replace(ruleRegexp, rule.replace));

                    return true;
                }
            })
        }
    });
};

let replaceBySelector = function(selector, rules) {
    let elements = [].slice.call(document.querySelectorAll(selector));
    let attributeName = extractAttributeFromSelector(selector);

    return replace(elements, attributeName, rules);
};

module.exports = {
    replace: replace,
    replaceBySelector: replaceBySelector
};