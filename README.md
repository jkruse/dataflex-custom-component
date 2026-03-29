# dfcc — DataFlex Custom Component CLI

A CLI tool for scaffolding and generating custom components for DataFlex webapps. Write modern JavaScript classes,
bundle them with Vite, and have them available in your DataFlex application.

## Features

- **Modern JavaScript** — write ES2024 class syntax with full ESLint checking
- **Vite bundler** — fast builds, watch mode for development
- **IIFE output** — components are bundled into `AppHtml/Custom/DFCC.js` and loaded as a global namespace object
- **Multiple components** — all components share a single bundle
- **Per-component CSS** — each component gets its own stylesheet

## Prerequisites

Install NodeJS if you haven't already:

    winget install OpenJS.NodeJS.LTS

## Usage

### Step 1 — Initialise a DataFlex workspace

Navigate to your DataFlex project folder and run:

    npx dfcc init

This creates the build setup in the current directory:
- `package.json` — Vite + ESLint dependencies and build scripts
- `vite.config.js` — Vite IIFE bundle configuration
- `eslint.config.js` — ESLint 10 flat config
- `src/index.js` — entry point that exports all components

Dependencies are installed automatically.

**Options:**

    npx dfcc init --name MyApp

Use `--name` to set the global namespace (default: `DFCC`). All components will be available as
`window.MyApp.<ComponentName>` in the browser.

### Step 2 — Create a component

    npx dfcc create MyCustomComponent

This generates:
- `src/MyCustomComponent.js` — JavaScript class extending `df.WebBaseControl`
- `src/MyCustomComponent.css` — stylesheet for the component
- `AppSrc/cMyCustomComponent.pkg` — DataFlex class with `psJSClass` pre-set

And updates `src/index.js` to export the new component.

Run `create` again for each additional component you want in the bundle:

    npx dfcc create MyOtherComponent

### Step 3 — Build

Build for production (runs ESLint first):

    npm run build

Watch mode during development (rebuilds on file changes):

    npm run watch

### Step 4 — Add to Index.html

Add the bundled files to your `Index.html`:

```html
<script src="Custom/DFCC.js"></script>
<link rel="stylesheet" href="Custom/DFCC.css">
```

### Step 5 — Use the component in DataFlex

In your DataFlex program, use the generated `.pkg` file like any other web control:

```dataflex
Use AppSrc\cMyCustomComponent.pkg

Object oMyWidget is a cMyCustomComponent
End_Object
```

## How it works

Each JavaScript component class is exported by name from `src/index.js`.
Vite bundles everything as an IIFE and assigns the exports to a global namespace object (e.g. `window.DFCC`).
The DataFlex `psJSClass` property points to the class using dot notation, e.g. `"DFCC.MyCustomComponent"`.

## Writing a component

The generated JavaScript class template looks like this:

```javascript
export class MyCustomComponent extends df.WebBaseControl {
    constructor(sName, oParent) {
        super(sName, oParent);
        this._sControlClass = 'my-custom-component';
    }

    openHtml(aHtml) {
        super.openHtml(aHtml);
        aHtml.push(`<div class="my-custom-component-wrapper" id="${this._sControlId}">`);
        aHtml.push('<h1>Hello DataFlex!</h1>');
        aHtml.push('</div>');
    }

    afterRender() {
        this._eControl = df.dom.query(this._eElem, `#${this._sControlId}`);
        super.afterRender();
    }
}
```

You can install and use npm packages inside your component files. They will be included in the bundle automatically.

## License

MIT
