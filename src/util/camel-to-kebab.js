'use strict';

/** Converts PascalCase to kebab-case, e.g. "MyWidget" → "my-widget" */
function camelToKebab(str) {
    return str.replace(/([A-Z])/g, (match, letter, offset) =>
        offset === 0 ? letter.toLowerCase() : '-' + letter.toLowerCase()
    );
}

module.exports = { camelToKebab };
