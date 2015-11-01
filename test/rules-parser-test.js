'use strict';

let assert = require('assert');
let parser = require('../src/rules-parser.js');

describe('A rules parser', () => {

    it('should parse multiple rules', () => {
        // given
        let text = `one => two
                    three=>four`

        // when
        let parsed = parser.parse(text);

        // then
        assert.equal(parsed[0].regexp.source, 'one');
        assert.equal(parsed[0].replace, 'two');
        assert.equal(parsed[1].regexp.source, 'three');
        assert.equal(parsed[1].replace, 'four');
    });
});
