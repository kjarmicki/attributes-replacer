'use strict';

const NAME = 'attr-replacer';

let messenger = {
    send: function(content) {
        let post = Object.assign({}, {
            from: NAME
        }, content);

        window.postMessage(post, '*');
    },
    listen: function(handler) {
        window.addEventListener('message', event => {
            if(event.source !== window) return;

            let data = event.data;
            if(data.from && data.from === NAME) {
                handler(data);
            }
        });
    }
};

module.exports = messenger;