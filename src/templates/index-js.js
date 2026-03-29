'use strict';

/**
 * Generates the initial src/index.js content for a scaffolded workspace.
 * @returns {string}
 */
function indexJs() {
    return `// Export all custom component classes from this file.
// Each export will be available as window.<namespace>.<ClassName> after the build.
// Run \`npx dfcc create <ComponentName>\` to add a new component.
`;
}

module.exports = { indexJs };
