'use strict';

let packageJSON = require('./package.json');
let manifest = require('./src/manifest');

manifest.createAsFileSync('dist/manifest.json', {
    name: packageJSON.name,
    description: packageJSON.description,
    version: packageJSON.version
});
