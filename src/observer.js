'use strict';

let mutationHandler;

const mutationObserver = new MutationObserver(mutations => {
    if(typeof mutationHandler === 'function') {
        let nestedElements = mutations
            .filter(mutation => mutation.type === 'childList')
            .map(mutation => [].slice.call(mutation.addedNodes));

        let elements = [].concat.apply([], nestedElements);

        mutationHandler(elements);
    }
});

let observeBySelector = function(selector, action) {
    mutationHandler = function(elements) {
        action(elements.filter(element =>
            element.nodeType === Node.ELEMENT_NODE && element.matches(selector))
        );
    };
    resume();
};

let pause = function() {
    mutationObserver.disconnect();
};

let resume = function() {
    mutationObserver.observe(document, {
        childList: true,
        subtree: true
    });
};

module.exports = {
    observeBySelector: observeBySelector,
    pause: pause,
    resume: resume
};