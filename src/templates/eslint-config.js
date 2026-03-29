'use strict';

/**
 * Generates the eslint.config.js content (ESLint 10 flat config).
 * @returns {string}
 */
function eslintConfig() {
    return `import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([{
    basePath: 'src',

    plugins: {
        js,
    },

    extends: ["js/recommended"],

    languageOptions: {
        globals: {
            ...globals.browser,
            df: 'readonly',
        }
    }
}]);
`;
}

module.exports = { eslintConfig };
