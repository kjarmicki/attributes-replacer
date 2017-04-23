'use strict';

let replacer = require('./replacer'),
    reverter = require('./reverter'),
    observer = require('./observer'),
    messenger = require('./messenger');

function insideTopWindow() {
    try {
        return window === window.top;
    } catch(e) {
        return false;
    }
}

let controls = {
    on(args) {
        replacer.replaceBySelectors(args.selectors, args.rules);
        observer.observe(changedNodes => {
            changedNodes.forEach(subtree => {
                replacer.replaceBySelectors(args.selectors, args.rules,
                    subtree.parentNode ? subtree.parentNode : subtree);
            });
        });
    },
    off(args) {
        reverter.revertBySelectors(args.selectors);
        observer.pause();
    },
    url(args) {
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

if(insideTopWindow()) {
    messenger.sendToExtension('background', {
        action: 'init'
    });
}
