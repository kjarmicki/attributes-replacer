'use strict';

let replacer = require('./replacer'),
    reverter = require('./reverter'),
    observer = require('./observer'),
    messenger = require('./messenger');

let controls = {
    on: function(args) {
        replacer.replaceBySelectors(args.selectors, args.rules);
        observer.observe(changedSubtree => {
            replacer.replaceBySelectors(args.selectors, args.rules, changedSubtree);
        });
    },

    off: function(args) {
        reverter.revertBySelectors(args.selectors);
        observer.pause();
    }
};

messenger.listen('content-script', message => {
    if(typeof controls[message.action] === 'function') {
        controls[message.action].call(controls, message.args);
    }
});
