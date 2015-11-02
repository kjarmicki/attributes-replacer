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
            });
        }
    });
};

let replaceString = function(toReplace, rules) {
    let matchedRule = rules.filter(rule => toReplace.match(rule.regexp))[0];

    if(matchedRule) {
        return toReplace.replace(matchedRule.regexp, matchedRule.replace);
    }
    return toReplace;
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
    replaceString: replaceString,
    replaceBySelectors: replaceBySelectors
};