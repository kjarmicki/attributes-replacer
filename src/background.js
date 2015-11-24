'use strict';

let textParser = require('./text-parser'),
    rulesParser = require('./rules-parser'),
    messenger = require('./messenger'),
    storage = require('./storage')(chrome.storage.sync, chrome.runtime);

let icon = {
    on() {
        chrome.browserAction.setIcon({path: 'icon-128.png'});
    },
    off() {
        chrome.browserAction.setIcon({path: 'icon-128-bnw.png'});
    }
};

let background = {
    on() {
        Promise.all([storage.get('selectors'), storage.get('rules')])
            .then((results) => {
                messenger.sendToTab('content-script', {
                    action: 'on',
                    args: {
                        selectors: textParser.parse(results[0]),
                        rules: rulesParser.parse(results[1])
                    }
                });
                icon.on();
            });

    },
    off() {
        storage.get('selectors').then(rawSelectors => {
            messenger.sendToTab('content-script', {
                action: 'off',
                args: {
                    selectors: textParser.parse(rawSelectors)
                }
            });
            icon.off();
        });

    },
    init() {
        storage.get('switch').then(turnedOn => {
            if(turnedOn === 'true') {
                background.on();
            } else {
                icon.off();
            }
        });
    },
    url() {
       storage.get('rules').then(rawRules => {
           messenger.sendToTab('content-script', {
               action: 'url',
               args: {
                   rules: rulesParser.parse(rawRules)
               }
           });
       });
    }
};

if(storage.isEmpty()) {
    storage.set('rules', `// place your regexp replacement rules here
http://example.com => http://different.com`);

    storage.set('selectors', `// place your attribute selectors here
a[href]`);
}

messenger.listen('background', message => {
    if(message.action === 'save') {
        storage.set(message.key, message.value);
    }
    else if(message.action === 'load') {
        storage.get(message.key).then(value => {
            messenger.sendToExtension(message.from, {
                action: 'load',
                key: message.key,
                value: value
            });
        });
    }
    else if(typeof background[message.action] === 'function') {
        background[message.action]();
    }
});
