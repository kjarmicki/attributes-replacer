/* global chrome */

'use strict';

let messenger = {
    send: function(content) {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, content);
        });
    },
    listen: function(handler) {
        chrome.runtime.onMessage.addListener(handler);
    }
};

module.exports = messenger;