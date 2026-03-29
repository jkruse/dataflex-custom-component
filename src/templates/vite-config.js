'use strict';

/**
 * Generates the vite.config.js content for a scaffolded DataFlex workspace.
 * @param {string} namespace - The IIFE global namespace name (e.g. "DFCC")
 * @returns {string}
 */
function viteConfig(namespace) {
    return `import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
    plugins: [eslint()],
    build: {
        lib: {
            entry: './src/index.js',
            formats: ['iife'],
            // All exported component classes are available as window.${namespace}.<ClassName>
            name: '${namespace}',
            fileName: () => 'index.js',
        },
        outDir: 'AppHtml/Custom',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                // Rename extracted CSS from the default "style.css" to "index.css"
                assetFileNames: (assetInfo) =>
                    assetInfo.name === 'style.css' ? 'index.css' : assetInfo.name,
            },
        },
    },
});
`;
}

module.exports = { viteConfig };
