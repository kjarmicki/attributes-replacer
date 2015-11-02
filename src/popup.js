'use strict';

let messenger = require('./messenger'),

    rulesElement = document.querySelector('#rules'),
    selectorsElement = document.querySelector('#selectors'),
    switchElement = document.querySelector('#switch'),
    urlElement = document.querySelector('#url');

let switchOn = function() {
    messenger.sendToExtension('background', {
        action: 'on'
    });
};

let switchOff = function() {
    messenger.sendToExtension('background', {
        action: 'off'
    });
};

let disableTextFields = function() {
    [rulesElement, selectorsElement].forEach(input => {
        input.setAttribute('disabled', 'disabled');
    });
};

let enableTextFields = function() {
    [rulesElement, selectorsElement].forEach(input => {
        input.removeAttribute('disabled');
    });
};

let persistValueAsync = function(key, value) {
    messenger.sendToExtension('background', {
        action: 'save',
        key: key,
        value: value
    });
};

let loadValueAsync = function(key) {
    messenger.sendToExtension('background', {
        from: 'popup',
        action: 'load',
        key: key
    });
};

// main logic
switchElement.addEventListener('change', event => {
    if(switchElement.checked) {
        switchOn();
        disableTextFields();
    }
    else {
        switchOff();
        enableTextFields();
    }
});


// initialization/persistence stuff

// persist element values when they change
rulesElement.addEventListener('change', event => {
    persistValueAsync('rules', rulesElement.value);
});

selectorsElement.addEventListener('change', event => {
    persistValueAsync('selectors', selectorsElement.value);
});

switchElement.addEventListener('change', event => {
    persistValueAsync('switch', switchElement.checked.toString());
});

urlElement.addEventListener('click', event => {
    messenger.sendToExtension('background', {
        action: 'url'
    });
});

// request selectors from storage upon page open
['selectors', 'rules', 'switch'].forEach(loadValueAsync);

// set proper data when it comes back
messenger.listen('popup', message => {
    if(message.action === 'load') {
        if(message.key === 'selectors') {
            selectorsElement.value = message.value;
        }
        if(message.key === 'rules') {
            rulesElement.value = message.value;
        }
        if(message.key === 'switch' && message.value === 'true') {
            switchElement.setAttribute('checked', 'checked');
            disableTextFields();
        }
    }
});
