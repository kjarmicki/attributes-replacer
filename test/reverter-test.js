'use strict';

let assert = require('assert');
let reverter = require('../src/reverter.js');
let sandbox = require('./utils/sandbox');

describe('A reverter', () => {

    beforeEach(sandbox.refresh);

    it("should revert attribute value according to original one", () => {
        // given
        sandbox.insert(`
                <a id="first" href="http://hello-world.com">Hello World!</a>
                <a id="second" href="http://hello-world.com/about">About Hello World!</a>
        `);

        // when
        sandbox.find('#first').__original_attribute_href__ = 'http://goodbye-cruel-world.com';
        sandbox.find('#second').__original_attribute_href__ = 'http://goodbye-cruel-world.com/about';

        reverter.revertBySelectors(['a[href]']);

        // then
        assert.equal(sandbox.getHTML().trim(), `
                <a id="first" href="http://goodbye-cruel-world.com">Hello World!</a>
                <a id="second" href="http://goodbye-cruel-world.com/about">About Hello World!</a>
        `.trim());
    });

});
