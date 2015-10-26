'use strict';

let messenger = require('./messenger');

let background = {
    save: function(key, value) {
        localStorage.setItem(key, value);
    },
    load: function(key) {
        return localStorage.getItem(key);
    }
};

messenger.listenToExtension('background', message => {
    if(message.action === 'save') {
        background.save(message.key, message.value);
    }

    if(message.action === 'load') {
        let value = background.load(message.key);
        messenger.sendToExtension(message.from, {
            action: 'load',
            key: message.key,
            value: value
        });
    }
});