'use strict';

let assert = require('assert');
let observer = require('../src/observer');
let replacer = require('../src/replacer');
let sandbox = require('./utils/sandbox');

describe('A replacer combined with observer', () => {

    beforeEach(sandbox.refresh);

    it("should replace element's attribute only once", done => {
        // given
        let a = document.createElement('a');
        let selectors = ['a[href]'];
        let rules = [{
            regexp: '^http://hello-world.com',
            replace: 'http://goodbye-cruel-world.com'
        }, {
            regexp: '^http://goodbye-cruel-world.com',
            replace: 'http://leaving-today.com'
        }];
        a.setAttribute('href', 'http://hello-world.com/leaving');
        a.innerHTML = 'Leaving';
        sandbox.insert(`
                <a href="http://hello-world.com">Hello</a>
                <a href="http://hello-world.com/about">About</a>
        `);

        // when
        replacer.replaceBySelectors(selectors, rules);
        observer.observe(changedNodes => {
            changedNodes.forEach(subtree => {
                replacer.replaceBySelectors(selectors, rules, subtree.parentNode);
            });
        });

        // then
        sandbox.find('a')[0].parentNode.appendChild(a);
        setTimeout(() => {
            assert.ok(sandbox.contentEquals(`
                <a href="http://goodbye-cruel-world.com">Hello</a>
                <a href="http://goodbye-cruel-world.com/about">About</a>
                <a href="http://goodbye-cruel-world.com/leaving">Leaving</a>
            `));
            done();
        }, 100);

    });
});
