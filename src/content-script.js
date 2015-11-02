'use strict';

let replacer = require('./replacer'),
    reverter = require('./reverter'),
    observer = require('./observer'),
    messenger = require('./messenger');

let controls = {
    on: function(args) {
        replacer.replaceBySelectors(args.selectors, args.rules);
        observer.observe(changedNodes => {
            changedNodes.forEach(subtree => {
                replacer.replaceBySelectors(args.selectors, args.rules, subtree);
            });
        });
    },
    off: function(args) {
        reverter.revertBySelectors(args.selectors);
        observer.pause();
    },
    url: function(args) {
        let current = window.location.href,
            replaced = replacer.replaceString(current, args.rules);

        if(current !== replaced) {
            window.location.href = replaced;
        }
    }
};

messenger.listen('content-script', message => {
    if(typeof controls[message.action] === 'function') {
        controls[message.action].call(controls, message.args);
    }
});

messenger.sendToExtension('background', {
    action: 'init'
});
