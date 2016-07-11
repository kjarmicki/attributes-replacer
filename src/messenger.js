/* global chrome */

'use strict';

let ns = (namespace, content) => Object.assign({}, {namespace: namespace}, content);

let messenger = {
    sendToTabs(namespace, content) {
        chrome.tabs.query({currentWindow: true}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, ns(namespace, content));
            });
        });
    },
    sendToExtension(namespace, content) {
        chrome.runtime.sendMessage(ns(namespace, content));
    },
    listen(namespace, handler) {
        chrome.runtime.onMessage.addListener(function(data) {
            if(data.namespace === namespace) {
                handler.apply(Object.create(null), arguments);
            }
        });
    }
};

module.exports = messenger;