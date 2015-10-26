'use strict';

let textParser = require('./text-parser'),
    rulesParser = require('./rules-parser'),
    messenger = require('./messenger'),

    rulesElement = document.querySelector('#rules'),
    selectorsElement = document.querySelector('#selectors'),
    switchElement = document.querySelector('#switch');

switchElement && switchElement.addEventListener('change', event => {
    let rules = rulesParser.parse(rulesElement.value);
    let selectors = textParser.parse(selectorsElement.value);
});

rulesElement && rulesElement.addEventListener('change', event => {
    messenger.sendToExtension('background', {
        action: 'save',
        key: 'rules',
        value: rulesElement.value
    });
});

selectorsElement && selectorsElement.addEventListener('change', event => {
    messenger.sendToExtension('background', {
        action: 'save',
        key: 'selectors',
        value: selectorsElement.value
    });
});

messenger.listenToExtension('popup', message => {
    if(message.action === 'load') {
        if(message.key === 'selectors') {
            selectorsElement.value = message.value;
        }
        if(message.key === 'rules') {
            rulesElement.value = message.value;
        }
    }
});

// request selectors from storage
messenger.sendToExtension('background', {
    from: 'popup',
    action: 'load',
    key: 'selectors'
});

messenger.sendToExtension('background', {
    from: 'popup',
    action: 'load',
    key: 'rules'
});
