'use strict';

let replacer = require('./replacer'),
    reverter = require('./reverter'),
    observer = require('./observer');

let controls = {
    on: function (selectors, rules) {
        replacer.replaceBySelectors(selectors, rules);
        observer.observe(changedSubtree => {
            replacer.replaceBySelectors(selectors, rules, changedSubtree);
        });
    },

    off: function (selectors) {
        reverter.revertBySelectors(selectors);
        observer.pause();
    }
};

window.addEventListener('message', event => {
    if(event.source !== window) return;

    let data = event.data;
    if(data.from && data.from === 'attr-replacer') {
        controls[data.action].apply(controls, data.args);
    }
});