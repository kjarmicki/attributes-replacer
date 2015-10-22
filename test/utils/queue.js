'use strict';

let queue = function() {
    let items = [];

    let add = function(task, delay) {
        items.push({
            task: task,
            delay: delay
        });
    };

    let next = function() {
        if(items.length > 0) {
            let item = items.shift();
            item.task();
            setTimeout(() => {
                next();
            }, item.delay || 0);
        }
    };

    let run = function() {
        next();
    };

    return {
        add: add,
        run: run
    };
};

module.exports = queue;