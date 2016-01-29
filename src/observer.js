'use strict';

let action;

const mutationObserver = new MutationObserver(mutations => {
    if(typeof action === 'function') {
        let nestedElements = mutations
            .filter(mutation => mutation.type === 'childList')
            .map(mutation => Array.from(mutation.addedNodes));

        let elements = [].concat.apply([], nestedElements)
            .filter(element => element.nodeType === Node.ELEMENT_NODE);

        action(elements);
    }
});

let pause = function() {
    mutationObserver.disconnect();
};

let resume = function() {
    mutationObserver.observe(document, {
        childList: true,
        subtree: true
    });
};

let observe = function(callback) {
    if(callback) action = callback;
    resume();
};

module.exports = {
    observe: observe,
    pause: pause,
    resume: resume
};