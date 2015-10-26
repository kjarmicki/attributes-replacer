'use strict';

let replacer = require('./replacer'),
    reverter = require('./reverter'),
    observer = require('./observer'),
    messenger = require('./messenger');

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

//messenger.listenToExtension(data => {
//    if(typeof controls[data.action] === 'function') {
//        controls[data.action].apply(controls, data.args);
//    }
//});
