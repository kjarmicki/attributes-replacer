/*
 * Create Chrome extension manifest file
 * based partially on external information (package.json)
 */

'use strict';

let fs = require('fs');

let create = function(overrides) {
    return Object.assign({
        manifest_version: 2,

        browser_action: {
            default_icon: 'icon-128.png',
            default_popup: 'popup.html'
        },
        icons: {
            128: 'icon-128.png'
        },
        permissions: [
            'storage'
        ],
        content_scripts: [{
            matches: ['<all_urls>'],
            js: ['content-script.js'],
            all_frames: true
        }],
        background: {
            scripts: ['background.js']
        }
    }, overrides);
};

let createAsFileSync = function(path, overrides) {
    var manifest = create(overrides);
    fs.writeFileSync(path, JSON.stringify(manifest, null, 4));
};

module.exports = {
    create: create,
    createAsFileSync: createAsFileSync
};
