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

The Babel TypeScript compiler performs transpilation only; type-checking is not supported. As a result, this plugin currently doesn't provide type checking.
