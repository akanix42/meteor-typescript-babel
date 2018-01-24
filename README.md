Babel TypeScript Compiler for Meteor

## Installation

1. Install the package

```bash
meteor add nathantreid:typescript-babel
```

This will also install the `@babel/preset-typescript` npm package, if you don't already have it installed.

2. Add the typescript preset to your ``.babelrc` file:
```json
{
  "presets": [
    "@babel/typescript"
  ],
}
```

## Usage

Create `.ts` or `.tsx` files and write some TypeScript!

## Notes

The Babel TypeScript compiler performs transpilation only; type-checking is not supported. As a result, this plugin currently doesn't provide type checking.
