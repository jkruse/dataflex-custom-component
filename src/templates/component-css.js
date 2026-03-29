'use strict';

const { camelToKebab } = require('../util/camel-to-kebab');

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

module.exports = { componentCss };
