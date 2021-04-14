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

## How to use

### Step 1 - Download this template

On GitHub you can download a ZIP file containing this repository from the green "Code" button or using [this link](https://github.com/jkruse/dataflex-custom-component/archive/master.zip).

### Step 2 - Unzip in your DataFlex project

Extract the ZIP file on your disk. This will create a "dataflex-custom-component-master" folder. Copy or move the entire contents of that folder into your DataFlex project. This will add one file to your AppSrc folder, a new "src" folder and some files in the root of your project.

### Step 3 - Install NodeJS (if you haven't already)

Download the latest LTS release of NodeJS [from here](https://nodejs.org/en/download/). The template needs at least version 12. Install it. Then open a command prompt in your DataFlex project folder and run

    > npm ci
    
This will download the dependencies of the template.

_If you know NodeJS already, you might wonder why not "npm install". The "ci" command is simply a lot quicker and just as good for this purpose._

### Step 4 - Do a test build

In the command prompt run

    > npm run build

This bundles the client-side of the component into your "AppHtml/Custom" folder, and should end with something similar to

    webpack 5.25.0 compiled successfully in 3495 ms

### Step 5 - Rename your component

The template stub component is named "WebCustomComponent" (client-side) / "cWebCustomComponent" (server-side). You should change this to whatever your component is called.

* In "src/index.js" change the class name and the corresponding name in the "export default ..." line (both sides of the assignment).
* In the AppSrc folder, rename "cWebCustomComponent.pkg" and change the class name in the file and the "psJSClass" property. The latter must match the name you used in the index.js file.

### Step 6 - Fill out the template

Add properties, events, markup and functions as needed to the pkg and js files. In the index.js file you can use the latest ECMAScript language features, and you have full access to all NPM packages.

### Step 7 - Build your component (client-side)

While developing your component, you can run

    > npm run watch

This will build a debug-version of the component client-side, and automatically rebuild every time you change index.js or index.css (or anything else you include).

To build for production, just run

    > npm run build

### Step 8 - Add the component to your Index.html

To use the component in your application, you need to add the client-side files to your Index.html. You should also add CoreJS, which polyfills any new language features you might have used, that are not natively supported by older browsers:

```html
<script src="https://unpkg.com/core-js-bundle@3.8.3/minified.js"></script>
<script src="Custom/index.js"></script>
<link rel="stylesheet" href="Custom/index.css">
```

That's it. You're good to go!

## Customizations

### Changing the output folder/file

The template builds to "AppHtml/Custom/index.(js|css)" by default, but you can easily change the folder name and/or the file name.

To change the folder name, edit `output.path` in "webpack.common.js" (you should only change the "Custom" part, as it still needs to build to your AppHtml folder).

To change the file name, change the name of the `index` property of the `entry` setting in "webpack.common.js":

```javascript
entry: {
    mycomponent: './src/index.js'
}
```

### Multiple components

You can have multiple custom components in the same bundle. To do so, rename/copy "index.js" to "component1.js" and "component2.js". Add a new "index.js" containing:

```javascript
import './component1'
import './component2'
```

Your bundle will now include both "component1.js" (and everything it includes) and "component2.js" (and everything it includes) in "AppHtml/Custom/index.js" (provided you didn't change the default).

### Styling

The template includes an empty stylesheet file "src/index.css". You can put any custom styling for your component in there, and it will be included in "AppHtml/Custom/index.css" when the component is built. If you don't use this feature, you can delete the "src/index.css" file and the line that loads it in "src/index.js".

### Changing browser support

The build process will rewrite any ECMAScript syntax you use, that is not yet supported by the browsers you want your application to run in. To do this, it needs to know which browsers that is. This is based on a set of rules in ".browserslistrc". The template ships with a reasonable default, but you change it if you need to support older browsers, or if, say, you don't want to support Internet Explorer 11. Run this to see the list of browsers supported:

    > npx browserslist

You can read about the syntax of ".browserslistrc" on the [Browserslist GitHub page](https://github.com/browserslist/browserslist#readme).