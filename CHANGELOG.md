# Change Log
All notable changes to this project will be documented in this file.
This project follows [Semantic Versioning](http://semver.org/).

## [0.0.4] - 2018-01-26
 - Insert a separate compilation step to run before Meteor's babel-compiler. This is the TypeScript compilation occurs,
   because otherwise reify will throw errors when it tries to parse some TypeScript syntax such as the `as` keyword.
   If the user has @babel/preset-typescript in .babelrc it will no longer have any effect, because the TypeScript preset
   is now being invoked prior to the normal Babel compilation.

## [0.0.3] - 2018-01-25
 - Avoid processing declarations (`d.ts`) files

## [0.0.2] - 2018-01-24
 - Always use the `@babel/preset-typescript` even if it's not included in `.babelrc`

## [0.0.1] - 2018-01-23
 - Initial release
