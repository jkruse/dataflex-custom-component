'use strict';

const fs = require('fs');
const path = require('path');

const { componentJs } = require('../templates/component-js');
const { componentCss } = require('../templates/component-css');
const { componentPkg } = require('../templates/component-pkg');
const { write } = require('../util/write');

const PASCAL_CASE_RE = /^[A-Z][A-Za-z0-9]*$/;

/**
 * Implements `df-cc create <ComponentName>`.
 * Generates a JS component file, a CSS file, a DataFlex .pkg file,
 * and adds a named export to src/index.js.
 * @param {string} name - PascalCase component name
 */
function create(name) {
    const cwd = process.cwd();

    // Validate PascalCase
    if (!PASCAL_CASE_RE.test(name)) {
        console.error(`Error: "${name}" is not a valid component name.`);
        console.error('Component names must be PascalCase (e.g. MyWidget, WebCustomButton).');
        process.exit(1);
    }

    // Read namespace from package.json
    const pkgPath = path.join(cwd, 'package.json');
    if (!fs.existsSync(pkgPath)) {
        console.error('Error: package.json not found. Run `npx df-cc init` first.');
        process.exit(1);
    }
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const namespace = pkg.dfcc?.namespace ?? 'DFCC';

    const srcDir = path.join(cwd, 'src');
    const appSrcDir = path.join(cwd, 'AppSrc');
    const indexPath = path.join(srcDir, 'index.js');

    // Guard: abort if any target file already exists
    const targets = [
        path.join(srcDir, `${name}.js`),
        path.join(srcDir, `${name}.css`),
        path.join(appSrcDir, `c${name}.pkg`),
    ];
    for (const target of targets) {
        if (fs.existsSync(target)) {
            console.error(`Error: ${path.relative(cwd, target)} already exists.`);
            process.exit(1);
        }
    }

    // Guard: src/index.js must exist
    if (!fs.existsSync(indexPath)) {
        console.error('Error: src/index.js not found. Run `npx df-cc init` first.');
        process.exit(1);
    }

    console.log(`Creating component ${name} (namespace: ${namespace})...`);

    // Ensure AppSrc directory exists
    if (!fs.existsSync(appSrcDir)) {
        fs.mkdirSync(appSrcDir, { recursive: true });
    }

    // Write component files
    write(srcDir, `${name}.js`, componentJs(name));
    write(srcDir, `${name}.css`, componentCss(name));
    write(appSrcDir, `c${name}.pkg`, componentPkg(name, namespace));

    // Append named export to src/index.js
    const exportLine = `export { ${name} } from './${name}';\n`;
    fs.appendFileSync(indexPath, exportLine, 'utf8');
    console.log(`  updated  src/index.js`);

    console.log(`\nDone! Component ${name} created.`);
    console.log(`  JS class:       src/${name}.js        → window.${namespace}.${name}`);
    console.log(`  CSS:            src/${name}.css`);
    console.log(`  DataFlex class: AppSrc/c${name}.pkg   (psJSClass: "${namespace}.${name}")`);
    console.log('\nRun `npm run build` to bundle, or `npm run watch` during development.');
}

module.exports = { create };
