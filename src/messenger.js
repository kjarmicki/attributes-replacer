/* global chrome */

'use strict';

let messenger = {
    sendToTab: function(content) {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, content);
        });
    },
    sendToExtension: function(namespace, content) {
        chrome.runtime.sendMessage(Object.assign({}, {namespace: namespace}, content));
    },
    listenToExtension: function(namespace, handler) {
        chrome.runtime.onMessage.addListener(function(data) {
            if(data.namespace === namespace) {
                handler.apply(Object.create(null), arguments);
            }
        });
    }
};

module.exports = messenger;