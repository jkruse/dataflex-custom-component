'use strict';

/**
 * Generates the vite.config.js content for a scaffolded DataFlex workspace.
 * @param {string} namespace - The IIFE global namespace name (e.g. "DFCC")
 * @returns {string}
 */
function viteConfig(namespace) {
    return `import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.js',
            formats: ['iife'],
            name: '${namespace}',
            fileName: () => '${namespace}.js',
            cssFileName: '${namespace}',
        },
        outDir: 'AppHtml/Custom',
        rollupOptions: {
            onwarn: (warning, defaultHandler) => {
                if (warning.code !== 'FILE_NAME_CONFLICT') {
                    defaultHandler(warning);
                }
            },
        },
    },
});
`;
}

module.exports = { viteConfig };
