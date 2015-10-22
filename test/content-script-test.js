'use strict';

let assert = require('assert');
let contentScript = require('../src/content-script.js');
let sandbox = require('./utils/sandbox');

describe('A content script', () => {

    beforeEach(sandbox.refresh);

    it("should be runnable by window message", done => {
        // given
        sandbox.insert(`
            <div attr="xxx"></div>
        `);

        // when
        window.postMessage({
            from: 'attr-replacer',
            action: 'on',
            args: [['div[attr]'], [{regexp: 'xxx', replace: 'yyy'}]]
        }, '*');

        // then
        setTimeout(() => {
            assert.equal(sandbox.getHTML().trim(), `
                <div attr="yyy"></div>
            `.trim());

            // reset
            window.postMessage({
                from: 'attr-replacer',
                action: 'off',
                args: [['div[attr]'], []]
            }, '*');

            setTimeout(done, 20);
        }, 100);
    });

});
