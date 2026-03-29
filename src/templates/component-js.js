'use strict';

/**
 * Generates the JS source file for a new component.
 * @param {string} name - PascalCase component name (e.g. "MyWidget")
 * @returns {string}
 */
function componentJs(name) {
    return `import './${name}.css';

export class ${name} extends df.WebBaseControl {
    constructor(sName, oParent) {
        super(sName, oParent);
        this._sControlClass = '${camelToKebab(name)}';
    }

    openHtml(aHtml) {
        super.openHtml(aHtml);
        aHtml.push(\`<div class="${camelToKebab(name)}-wrapper" id="\${this._sControlId}">\`);

        // Insert component markup here
        aHtml.push('<h1>Hello DataFlex!</h1>');

        aHtml.push('</div>');
    }

    afterRender() {
        this._eControl = df.dom.query(this._eElem, \`#\${this._sControlId}\`);
        super.afterRender();

        // Insert component bootstrap code here
    }

    // Example client-side method called from the server
    exampleMethod(a, b) {
        const decimalSeparator = this.getWebApp().psDecimalSeparator;
        const sum = df.sys.data.stringToNum(a, decimalSeparator)
                  + df.sys.data.stringToNum(b, decimalSeparator);
        alert(\`\${a} + \${b} = \${df.sys.data.numToString(sum, decimalSeparator)}\`);
    }
}
`;
}

/** Converts PascalCase to kebab-case, e.g. "MyWidget" → "my-widget" */
function camelToKebab(str) {
    return str
        .replace(/([A-Z])/g, (match, letter, offset) =>
            offset === 0 ? letter.toLowerCase() : '-' + letter.toLowerCase()
        );
}

module.exports = { componentJs };
