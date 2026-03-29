'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { packageJson } = require('../templates/package-json');
const { viteConfig } = require('../templates/vite-config');
const { eslintConfig } = require('../templates/eslint-config');
const { indexJs } = require('../templates/index-js');

/**
 * Implements `dfcc init [--name <namespace>]`.
 * Scaffolds the Vite + ESLint build setup into the current working directory.
 * @param {object} options
 * @param {string} options.name - IIFE global namespace (default "DFCC")
 */
function init(options) {
    const cwd = process.cwd();
    const namespace = options.name || 'DFCC';

    // Guard: abort if package.json already exists
    if (fs.existsSync(path.join(cwd, 'package.json'))) {
        console.error('Error: package.json already exists. This workspace appears to be already initialised.');
        console.error('If you want to reinitialise, remove package.json first.');
        process.exit(1);
    }

    console.log(`Initialising DataFlex custom component setup (namespace: ${namespace})...`);

    // Write package.json
    write(cwd, 'package.json', packageJson(namespace));

    // Write vite.config.js
    write(cwd, 'vite.config.js', viteConfig(namespace));

    // Write eslint.config.js
    write(cwd, 'eslint.config.js', eslintConfig());

    // Write src/index.js
    const srcDir = path.join(cwd, 'src');
    if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
    }
    write(srcDir, 'index.js', indexJs());

    // Run npm install
    console.log('\nRunning npm install...');
    try {
        execSync('npm install', { cwd, stdio: 'inherit' });
    } catch {
        console.error('\nError: npm install failed. Please run it manually.');
        process.exit(1);
    }

    console.log('\nDone! Next steps:');
    console.log('  npx dfcc create <ComponentName>   — generate your first component');
    console.log('  npm run build                      — bundle to AppHtml/Custom/');
    console.log('  npm run watch                      — watch mode for development');
}

/** Writes content to a file, logging the path relative to cwd. */
function write(dir, filename, content) {
    const fullPath = path.join(dir, filename);
    const rel = path.relative(process.cwd(), fullPath);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  created  ${rel}`);
}

module.exports = { init };
