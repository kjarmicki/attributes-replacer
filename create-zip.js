'use strict';

let fs = require('fs'),
    archiver = require('archiver'),
    archive = archiver('zip'),
    path = 'dist/extension.zip';

archive.pipe(fs.createWriteStream(path));

archive.bulk([
    {
        src: ['**'],
        cwd: 'dist',
        expand: true,
        filter: src => src !== path // skip existing extension.zip file in dist
    }
]).finalize();
