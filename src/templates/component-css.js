'use strict';

/**
 * Generates the CSS file for a new component.
 * @param {string} name - PascalCase component name (e.g. "MyWidget")
 * @returns {string}
 */
function componentCss(name) {
    const kebab = camelToKebab(name);
    return `/* Styles for ${name} */

.${kebab}-wrapper {
}
`;
}

/** Converts PascalCase to kebab-case */
function camelToKebab(str) {
    return str.replace(/([A-Z])/g, (match, letter, offset) =>
        offset === 0 ? letter.toLowerCase() : '-' + letter.toLowerCase()
    );
}

module.exports = { componentCss };
