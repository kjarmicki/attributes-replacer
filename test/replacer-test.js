'use strict';

let assert = require('assert');
let replacer = require('../src/replacer.js');
let sandbox = require('./utils/sandbox');

describe('A replacer', () => {

    beforeEach(sandbox.refresh);

    it("should replace element's attributes according to regexp", () => {
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

    it('should save original attribute value under element.__original_attribute_[name]__', () => {
        // given
        sandbox.insert(`
                <a id="first" href="http://hello-world.com">Hello World!</a>
                <a id="second" href="http://hello-world.com/about">About Hello World!</a>
        `);

        // when
        replacer.replaceBySelector('a[href]', [{
            regexp: '^http://hello-world.com', replace: 'http://goodbye-cruel-world.com'
        }]);
        let first = sandbox.find('#first');
        let second = sandbox.find('#second');

        // then
        assert.equal(first.__original_attribute_href__, 'http://hello-world.com');
        assert.equal(second.__original_attribute_href__, 'http://hello-world.com/about');
    });
});