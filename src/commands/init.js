'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { packageJson } = require('../templates/package-json');
const { viteConfig } = require('../templates/vite-config');
const { eslintConfig } = require('../templates/eslint-config');
const { indexJs } = require('../templates/index-js');
const { write } = require('../util/write');

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

    // Update .gitignore
    updateGitignore(cwd);

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
    console.log('  npm run build                     — bundle to AppHtml/Custom/');
    console.log('  npm run watch                     — watch mode for development');
}

module.exports = { init };

/**
 * Ensures `node_modules` and `AppHtml/Custom` are listed in .gitignore.
 * Creates the file if it doesn't exist; appends only the entries that are missing.
 */
function updateGitignore(cwd) {
    const gitignorePath = path.join(cwd, '.gitignore');
    const required = ['node_modules', 'AppHtml/Custom'];

    const existing = fs.existsSync(gitignorePath)
        ? fs.readFileSync(gitignorePath, 'utf8')
        : '';

    const lines = existing.split(/\r?\n/);
    const missing = required.filter(
        (entry) => !lines.some((line) => line.trim() === entry)
    );

    if (missing.length === 0) {
        console.log('  up-to-date  .gitignore');
        return;
    }

    const separator = existing.length > 0 && !existing.endsWith('\n') ? '\n' : '';
    fs.appendFileSync(gitignorePath, separator + missing.join('\n') + '\n', 'utf8');
    console.log(`  ${existing.length > 0 ? 'updated' : 'created'}  .gitignore`);
}
