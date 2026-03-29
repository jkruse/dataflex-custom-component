'use strict';

/**
 * Generates the package.json content for a scaffolded DataFlex workspace.
 * @param {string} namespace - The IIFE global namespace name (e.g. "DFCC")
 * @returns {string} JSON string
 */
function packageJson(namespace) {
    return JSON.stringify({
        private: true,
        type: 'module',
        scripts: {
            build: 'eslint && vite build',
            watch: 'vite build --watch',
        },
        devDependencies: {
            '@eslint/js': '^10.0.0',
            eslint: '^10.0.0',
            globals: '^17.0.0',
            vite: '^8.0.0',
        },
        dfcc: {
            namespace,
        },
    }, null, 2) + '\n';
}

module.exports = { packageJson };
