'use strict';

let assert = require('assert');
let parser = require('../src/text-parser.js');
let sandbox = require('./utils/sandbox');

describe('A text parser', () => {

    it('should parse multilined text', () => {
        // given
        let text = `hello
                    this is
                    a multiline text`;

        // when
        let parsed = parser.parse(text);

        // then
        assert.deepEqual(parsed, ['hello', 'this is', 'a multiline text']);
    });

    it('should get rid of empty lines', () => {
        // given
        let text = `hello
                    this is


                    a multiline text`;

        // when
        let parsed = parser.parse(text);

        // then
        assert.deepEqual(parsed, ['hello', 'this is', 'a multiline text']);
    });

    it('should get rid of comments', () => {
        // given
        let text = `hello
                    this is
                    // not
                    a multiline text`;

        // when
        let parsed = parser.parse(text);

        // then
        assert.deepEqual(parsed, ['hello', 'this is', 'a multiline text']);
    });

});
