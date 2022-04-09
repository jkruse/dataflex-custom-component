# DataFlex Custom Component - a quickstart template

This template project provides scaffolding for custom component development in your DataFlex project, using state of the art JavaScript bundling and the latest ECMAScript language features.

What this means is you can write

```javascript
class MyCustomComponent extends df.WebBaseControl {
    openHtml(aHtml) {
        super.openHtml(aHtml);
        aHtml.push(`<h1>Welcome to ${new Date().getFullYear()}!</h1>`);
    }
}
```

instead of

```javascript
var MyCustomComponent = function (sName, oParent) {
    MyCustomComponent.base.constructor.call(this, sName, oParent);
};
df.defineClass("MyCustomComponent", "df.WebBaseControl", {
    openHtml: function (aHtml) {
        MyCustomComponent.base.openHtml.call(this, aHtml);
        aHtml.push('<h1>Welcome to ' + new Date().getFullYear() + '!</h1>');
    }
});
```

and have your client-side code syntax checked, transpiled to run in the browsers of your choice, bundled and minified before you ship it in your application.

# Getting started

## Step 1 - Install NodeJS and Git (if you haven't already)

Install NodeJS and Git using `winget`:

    winget install OpenJS.NodeJS.LTS
    winget install Git.Git

If that fails, you can download [NodeJS](https://nodejs.org/en/download/) and [Git](https://git-scm.com/download/win) installers and run those.

## Step 2 - Add this template to your DataFlex project

Navigate to your DataFlex project folder and run:

    npx tiged jkruse/dataflex-custom-component --force

This downloads a copy of the template using [tiged](https://github.com/tiged/tiged), which will add one file to your `AppSrc` folder, a new `src` folder and some files in the root of your project.

## Step 3 - Install the template dependencies

Still in your project folder, run:

    npm ci
    
This will download the dependencies of the template.

_If you know NodeJS already, you might wonder why not `npm install`. The `ci` command is simply a lot quicker and just as good for this purpose._

## Step 4 - Do a test build

In the command prompt run:

    npm run build

This bundles the client-side of the component into your `AppHtml/Custom` folder, and should end with something similar to

    webpack 5.70.0 compiled successfully in 3495 ms

## Step 5 - Rename your component

The template stub component is named "WebCustomComponent" (client-side) / "cWebCustomComponent" (server-side). You should change this to whatever you want to call your component.

* In `src/index.js` change the class name and the corresponding name in the `export default ...` line at the bottom (both sides of the assignment).
* In the `AppSrc` folder, rename `cWebCustomComponent.pkg` and change the class name in the file and the `psJSClass` property. The latter must match the name you used in the `index.js` file.

## Step 6 - Fill out the template

Add properties, events, markup and functions as needed to the pkg and js files. You can take advantage of the features provided by this template:

* Use the latest [ECMAScript language features](https://github.com/sudheerj/ECMAScript-features)
* Install and use [NPM packages](https://www.npmjs.com/)
* Use advanced features of webpack, such as [code splitting](https://webpack.js.org/guides/code-splitting/#dynamic-imports) to optimize your app startup time if you import large libraries
* JSHint comes included, and will warn you about any mistakes in your code

## Step 7 - Build your component (client-side)

While developing your component, you can run:

    npm run watch

This will build a debug version of the component client-side, and automatically rebuild every time you change `index.js` or `index.css` (or anything else you include).

To build for production, just run:

    npm run build

## Step 8 - Add the component to your Index.html

To use the component in your application, you need to add the client-side files to your `Index.html`. You should also add CoreJS, which polyfills any new language features you might have used, that are not natively supported by older browsers:

```html
<script src="https://cdn.jsdelivr.net/npm/core-js-bundle@3/minified.js"></script>
<script src="Custom/index.js"></script>
<link rel="stylesheet" href="Custom/index.css">
```

That's it. You're good to go!

# Customizing

## Changing the output folder/file

The template builds to `AppHtml/Custom/index.(js|css)` by default, but you can easily change the folder name and/or the file name.

To change the folder name, edit `folderName` in `webpack.common.js`.

To change the file name, change the name (not the value) of the `index` property of the `entry` setting in `webpack.common.js` (do not change the name of `src/index.js`):

```javascript
entry: {
    mycomponent: './src/index.js'
}
```

would create output file `mycomponent.js`.

Remember to also change `Index.html`.

## Multiple components

You can have multiple custom components in the same bundle. To do so, rename/copy `index.js` to `component1.js` and `component2.js`. Add a new `index.js` containing:

```javascript
import './component1'
import './component2'
```

Your bundle will now include both `component1.js` (and everything it includes) and `component2.js` (and everything it includes) in `AppHtml/Custom/index.js` (provided you didn't change the default).

## Styling

The template includes an empty stylesheet file `src/index.css`. You can put any custom styling for your component in there, and it will be included in `AppHtml/Custom/index.css` when the component is built. If you don't use this feature, you can delete the `src/index.css` file and the line that loads it in `src/index.js`.

## Changing browser support

The build process will rewrite any ECMAScript syntax you use, that is not yet supported by the browsers you want your application to run in. To do this, it needs to know which browsers that is. This is based on a set of rules in `.browserslistrc`.

The template ships with a reasonable default, but you change it if you need to support older browsers, or if you wish to narrow support to, say, only recent versions of Chrome, Edge, Firefox and Safari.

Note that Internet Explorer 11 support is now off by default. If you need to support Internet Explorer 11, delete "not ie 11" from `.browserslistrc`. Run this to see the list of browsers supported:

    npx browserslist

You can read about the syntax of `.browserslistrc` on the [Browserslist GitHub page](https://github.com/browserslist/browserslist#readme).