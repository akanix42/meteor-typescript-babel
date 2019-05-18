Babel TypeScript Compiler for Meteor

## Installation

1. Install the package

```bash
meteor add nathantreid:typescript-babel
```

This will also install the `@babel/preset-typescript` npm package, if you don't already have it installed.

## Usage

Create `.ts` or `.tsx` files and write some TypeScript!

###
Ignoring files

If you need to exclude some files from processing, you can do so by creating a `.tsignore` file in your project root.
This file abides by the `.gitignore` syntax.
For example, to ignore all `.ts` files in node_modules, use the following `.tsignore` file:

```
node_modules/**/*.ts

```

## Notes

The Babel TypeScript compiler performs transpilation only; type-checking is not supported. As a result, this plugin
currently doesn't provide type checking.

Internally, this plugin uses the version of Babel included with the Meteor Babel compiler. The Meteor babel compiler
is maintained by Meteor and is updated separately from this package, so you may encounter times when the Babel plugins
installed in your `devDependences` by this package are out-of-sync with the Meteor package and require upgrading or
downgrading, depending on your version of Meteor.

If you receive a message like the following, you need to manually adjust your Babel plugin versions:
```
[BABEL] /src/file: Requires Babel "^7.0.0-beta.41", but was loaded with "7.0.0-beta.38".
```

In the instance above, Meteor is using Babel version 7.0.0-beta.38, but the Babel plugin is at 7.0.0-beta.41.
There was a breaking change at version 41, so Babel cannot load the plugin. To fix this, check your `package.json` for
Babel plugins at version 41 and run npm install to fix them.

Example package.json snippet:
``` js
 "devDependencies": {
     "@babel/plugin-syntax-decorators": "7.0.0-beta.40",
     "@babel/plugin-syntax-dynamic-import": "^7.0.0-beta.40"
 },
```

Command to fix:
```
meteor npm i -D @babel/plugin-syntax-decorators@7.0.0-beta.38 @babel/plugin-syntax-dynamic-import@7.0.0-beta.38
```

## Contributing
Pull requests are encouraged! [Prettier](https://prettier.io/) is used for formatting.
