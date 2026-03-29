'use strict';

/**
 * Generates the eslint.config.js content (ESLint 10 flat config).
 * @returns {string}
 */
function eslintConfig() {
    return `import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                df: 'readonly',
                global: 'writable',
            },
        },
    },
];
`;
}

module.exports = { eslintConfig };
