'use strict';

let assert = require('assert');
let replacer = require('../src/replacer.js');
let sandbox = require('./utils/sandbox');

describe('A replacer', () => {

    beforeEach(sandbox.refresh);

    it('should do stuff', () => {
        // given
        sandbox.insert(`
                <a href="http://hello-world.com">Hello World!</a>
                <a href="http://hello-world.com/about">About Hello World!</a>
        `);

        // when
        replacer.replaceBySelector('a[href]', [{
            regexp: '^http://hello-world.com', replace: 'http://goodbye-cruel-world.com'
        }]);

        // then
        assert.equal(sandbox.getHTML().trim(), `
                <a href="http://goodbye-cruel-world.com">Hello World!</a>
                <a href="http://goodbye-cruel-world.com/about">About Hello World!</a>
        `.trim());

    });
});