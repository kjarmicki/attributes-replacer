'use strict';

let assert = require('assert');
let messenger = require('../src/messenger');
let queue = require('./utils/queue');

describe('A messenger', () => {

    it('should be able to send a message', done => {
        let listener = event => {
            assert.equal(event.source, window);
            assert.equal(event.data.from, 'attr-replacer');
            assert.equal(event.data.payload, 'hello');

            window.removeEventListener('message', listener);
            done();
        };

        window.addEventListener('message', listener);

        messenger.send({
            payload: 'hello'
        });
    });

    it('should be able to listen for a message', done => {
        messenger.listen(data => {
            assert.equal(data.payload, 'hello');

            done();
        });

        window.postMessage({
            from: 'attr-replacer',
            payload: 'hello'
        }, '*');
    });
});