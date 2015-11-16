'use strict';

let ams = function(initial) {
    let memo = Object.assign({}, initial);

    return {
        set: function(values, callback) {
            setTimeout(() => {
                Object.assign(memo, values);
                callback();
            }, 1);
        },
        get: function(key, callback) {
            setTimeout(() => {
                callback({[key]: memo[key]});
            }, 1);
        },
        dump: function() {
            return Object.assign({}, memo);
        }
    };
};

module.exports = ams;