'use strict';

const fs = require('fs');
const path = require('path');

/** Writes content to a file, logging the path relative to cwd. */
function write(dir, filename, content) {
    const fullPath = path.join(dir, filename);
    const rel = path.relative(process.cwd(), fullPath);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  created  ${rel}`);
}

module.exports = { write };
