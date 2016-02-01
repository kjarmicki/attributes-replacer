'use strict';

let storage = require('../src/storage'),
    ame = require('./utils/async-memory-engine'),
    assert = require('assert');

describe('A storage', () => {

     it('should be able to get a value', done => {
          // given
         let engine = ame({
             hello: 'world'
         });
         let memoryStorage = storage(engine);

         // when
         let getOp = memoryStorage.get('hello');

         // then
         getOp.then(result => {
             assert.equal(result, 'world');
             done();
         });
     });

     it('should be able to set a value', done => {
         // given
         let engine = ame();
         let memoryStorage = storage(engine);

         // when
         let setOp = memoryStorage.set('hello', 'world');

         // then
         setOp.then(result => {
             assert.deepEqual(engine.dump(), {
                 hello: 'world'
             });
             done();
         });
     });

    it('should return proper value when storage is empty', done => {
        // given
        let engine = ame();
        let memoryStorage = storage(engine);

        // when
        memoryStorage.isEmpty()
            // then
            .then(empty => {
                assert.ok(empty);
                done();
            });
    });

    it('should return proper value when storage is not empty', done => {
        // given
        let engine = ame();
        let memoryStorage = storage(engine);

        memoryStorage.set('hello', 'world')
            // when
            .then(() => memoryStorage.isEmpty())

            // then
            .then(empty => {
                assert.ok(!empty);
                done();
            });
    });
});
