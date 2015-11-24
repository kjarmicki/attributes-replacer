'use strict';

let makeStorage = function(engine, runtime) {
    return {
        get(key) {
            return new Promise((resolve, reject) => {
                engine.get(key, result => {
                    if(runtime && runtime.lastError) return reject(runtime.lastError);
                    resolve(result[key]);
                });
            });
        },
        set(key, value) {
            return new Promise((resolve, reject) => {
                engine.set({[key]: value}, result => {
                    if(runtime && runtime.lastError) return reject(runtime.lastError);
                    resolve(result);
                });
            });
        },
        isEmpty() {
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