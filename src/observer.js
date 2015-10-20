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

let pause = function() {
    mutationObserver.disconnect();
};

let resume = function() {
    mutationObserver.observe(document, {
        childList: true,
        subtree: true
    });
};

let observeBySelectors = function(selectors, action) {
    mutationHandler = function(candidates) {
        candidates = candidates.filter(element => element.nodeType === Node.ELEMENT_NODE);

        let elements = [];
        selectors.forEach(selector => {
            candidates.forEach(candidate => {
                if(candidate.matches(selector)) {
                    elements.push(candidate);
                }
            });
        });

        action(elements);
    };
    resume();
};

module.exports = {
    observeBySelectors: observeBySelectors,
    pause: pause,
    resume: resume
};