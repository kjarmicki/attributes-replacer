'use strict';

let assert = require('assert');
let observer = require('../src/observer.js');
let sandbox = require('./utils/sandbox');

describe('An observer', () => {

    beforeEach(sandbox.refresh);

    it("should react to changes in child nodes", done => {
        // given
        sandbox.insert(`
                <a href="http://hello-world.com">Hello World!</a>
                <a href="http://hello-world.com/about">About Hello World!</a>
        `);

        observer.observeBySelector('a[href]', nodes => {
            nodes.forEach(node => node.visited = true);
        });

        // when
        setTimeout(() => {
            sandbox.append('<a id="observed" href="http://hello-world.com/observed">Observe World!</a>');
        }, 100);

        // then
        setTimeout(() => {
            let observedElement = sandbox.find('#observed');
            assert.equal(observedElement.visited, true);
            done();
        }, 200);

    });

    it("should be able to pause observing", done => {
        // given
        sandbox.insert(`
                <a href="http://hello-world.com">Hello World!</a>
                <a href="http://hello-world.com/about">About Hello World!</a>
        `);

        observer.observeBySelector('a[href]', nodes => {
            nodes.forEach(node => node.visited = true);
        });

        // when
        setTimeout(() => {
            observer.pause();
            sandbox.append('<a id="observed" href="http://hello-world.com/observed">Observe World!</a>');
        }, 100);

        // then
        setTimeout(() => {
            let observedElement = sandbox.find('#observed');
            assert.equal(observedElement.visited, undefined);
            done();
        }, 200);

    });

    it("should be able to resume observing", done => {
        // given
        sandbox.insert(`
                <a href="http://hello-world.com">Hello World!</a>
                <a href="http://hello-world.com/about">About Hello World!</a>
        `);

        observer.observeBySelector('a[href]', nodes => {
            nodes.forEach(node => node.visited = true);
        });

        // when
        setTimeout(() => {
            observer.pause();
            observer.resume();
            sandbox.append('<a id="observed" href="http://hello-world.com/observed">Observe World!</a>');
        }, 100);

        // then
        setTimeout(() => {
            let observedElement = sandbox.find('#observed');
            assert.equal(observedElement.visited, true);
            done();
        }, 200);

    });

});