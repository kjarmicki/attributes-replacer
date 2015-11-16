'use strict';

let makeStorage = function(engine, runtime) {
    return {
        get: function(key) {
            return new Promise((resolve, reject) => {
                engine.get(key, result => {
                    if(runtime && runtime.lastError) return reject(runtime.lastError);
                    resolve(result[key]);
                });
            });
        },
        set: function(key, value) {
            return new Promise((resolve, reject) => {
                engine.set({[key]: value}, result => {
                    if(runtime && runtime.lastError) return reject(runtime.lastError);
                    resolve(result);
                });
            });
        },
        isEmpty: function() {
            return new Promise((resolve, reject) => {
                engine.getBytesInUse(null, result => {
                    if(runtime && runtime.lastError) return reject(runtime.lastError);
                    resolve(result === 0);
                });
            });
        }
    };
};

module.exports = makeStorage;