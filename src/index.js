/*global df, global */

import './index.css';

let decimalSeparator;

// Use this to convert numbers received from the server (as strings) to numbers
function stringToNum(string) {
    return df.sys.data.stringToNum(string, decimalSeparator);
}

// Use this to convert numbers back to whatever regional format the webapp uses
function numToString(num, decimals) {
    return df.sys.data.numToString(num, decimalSeparator, decimals);
}

class WebCustomComponent extends df.WebBaseControl {
    constructor(sName, oParent) {
        super(sName, oParent);
        this._sControlClass = 'custom-component';
        decimalSeparator = this.getWebApp().psDecimalSeparator;

        // Define web properties and events here
    }

    openHtml(aHtml) {
        super.openHtml(aHtml);
        aHtml.push(`<div class="custom-component-wrapper" id="${this._sControlId}">`);

        // Insert component markup here
        aHtml.push('<h1>Hello DataFlex!</h1>');
        
        aHtml.push('</div>');
    }

    afterRender() {
        this._eControl = df.dom.query(this._eElem, `#${this._sControlId}`);
        super.afterRender();

        // Insert component bootstrap code here
    }

    // Example client-side method called with numeric arguments
    exampleMethod(a, b) {
        // Arguments from the server are always sent as strings, so remember to convert numeric arguments
        const sum = stringToNum(a) + stringToNum(b);
        // You can also convert numbers back to regional format
        alert(`${a} + ${b} = ${numToString(sum)}`);
    }
}

export default global.WebCustomComponent = WebCustomComponent;