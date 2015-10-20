'use strict';

const id = 'sandbox';
let element;

module.exports = {
    refresh: function() {
        if(element) {
            element.parentNode.removeChild(element);
        }

        element = document.createElement('div');
        element.setAttribute('id', id);
        document.querySelector('body').appendChild(element);
    },
    insert: function(html) {
        element.innerHTML = html;
    },
    append: function(html) {
        element.innerHTML += html;
    },
    getHTML: function() {
        return element.innerHTML;
    },
    find: function(selector) {
        let found = document.querySelectorAll(selector);
        return found.length === 1 ? found[0] : found;
    }
};
