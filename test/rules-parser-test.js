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
        assert.deepEqual(parsed, [{
            regexp: 'one', replace: 'two'
        }, {
            regexp: 'three', replace: 'four'
        }]);
    });
});
