'use strict';

let messenger = require('./messenger'),

    rulesElement = document.querySelector('#rules'),
    selectorsElement = document.querySelector('#selectors'),
    switchElement = document.querySelector('#switch'),
    urlElement = document.querySelector('#url'),
    rulesEditor, selectorsEditor;

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

let disableEditors = function() {
    [rulesEditor, selectorsEditor].forEach(editor => {
        editor.setOption('readOnly', 'nocursor');
        editor.setOption('theme', 'disabled');
    });
};

let enableEditors = function() {
    [rulesEditor, selectorsEditor].forEach(editor => {
        editor.setOption('readOnly', false);
        editor.setOption('theme', 'default');
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

// code mirror modes
CodeMirror.defineSimpleMode('rules', {
    start: [
        { regex: /\=\>/, token: 'operator' }, // => separator
        { regex: /\/\/.*/, token: 'comment', sol: true },
        { regex: /.(?!\=\>)+/, token: 'variable-1' } // any left or right hand side rule
    ]
});

CodeMirror.defineSimpleMode('selectors', {
    start: [
        { regex: /(\.|\#){1}[a-zA-Z0-9\-]+/, token: 'variable-1' }, // id or class
        { regex: /[a-zA-Z0-9]+/, token: 'variable-1' }, // element
        { regex: /:[0-9a-z\-\(\)]+/, token: 'variable-2' }, // pseudoselector
        { regex: /\[[0-9a-z]+\]/, token: 'operator' }, // attribute selector
        { regex: /\/\/.*/, token: 'comment', sol: true }
    ]
});

// code mirror editors
rulesEditor = CodeMirror.fromTextArea(rulesElement, {
    mode: 'rules',
    lineNumbers: true
});
rulesEditor.setSize('100%', '80');

selectorsEditor = CodeMirror.fromTextArea(selectorsElement, {
    mode: 'selectors',
    lineNumbers: true
});
selectorsEditor.setSize('100%', '66');

// main logic
switchElement.addEventListener('change', event => {
    if(switchElement.checked) {
        switchOn();
        disableEditors();
    }
    else {
        switchOff();
        enableEditors();
    }
});


// initialization/persistence stuff

// persist element values when they change
rulesEditor.on('change', event => {
    persistValueAsync('rules', rulesEditor.getValue());
});

selectorsEditor.on('change', event => {
    persistValueAsync('selectors', selectorsEditor.getValue());
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
            selectorsEditor.setValue(message.value);
        }
        if(message.key === 'rules') {
            rulesEditor.setValue(message.value);
        }
        if(message.key === 'switch' && message.value === 'true') {
            switchElement.setAttribute('checked', 'checked');
            disableEditors();
        }
    }
});
