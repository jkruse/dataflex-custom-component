import css from './index.css';

let decimalSeparator;

function stringToNum(string) {
    return df.sys.data.stringToNum(string, decimalSeparator);
}

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
        
        aHtml.push('</div>');
    }

    afterRender() {
        this._eControl = df.dom.query(this._eElem, `#${this._sControlId}`);
        super.afterRender();

        // Insert component bootstrap code here
    }
}

export default global.WebCustomComponent = WebCustomComponent;