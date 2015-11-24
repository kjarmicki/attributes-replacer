/* global chrome */

'use strict';

let ns = (namespace, content) => Object.assign({}, {namespace: namespace}, content);

let messenger = {
    sendToTab(namespace, content) {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, ns(namespace, content));
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