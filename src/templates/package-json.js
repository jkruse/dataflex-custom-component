'use strict';

/**
 * Generates the package.json content for a scaffolded DataFlex workspace.
 * @param {string} namespace - The IIFE global namespace name (e.g. "DFCC")
 * @returns {string} JSON string
 */
function packageJson(namespace) {
    return JSON.stringify({
        name: 'dataflex-custom-components',
        version: '0.1.0',
        description: 'DataFlex Custom Components',
        license: 'MIT',
        type: 'module',
        scripts: {
            build: 'vite build',
            watch: 'vite build --watch',
            lint: 'eslint src',
        },
        devDependencies: {
            eslint: '^10.0.0',
            globals: '^16.0.0',
            vite: '^8.0.0',
            'vite-plugin-eslint2': '^5.1.0',
        },
        dfcc: {
            namespace,
        },
    }, null, 2) + '\n';
}

module.exports = { packageJson };
