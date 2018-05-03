Package.describe({
  name: 'nathantreid:typescript-babel',
  version: '0.0.7',
  summary: 'Babel compiler plugin for TypeScript files',
  documentation: 'README.md',
  git: 'https://github.com/nathantreid/meteor-typescript-babel.git',
});

Package.registerBuildPlugin({
  name: 'compile-typescript',
  use: [
    'babel-compiler@7.0.7',
    'ecmascript@0.10.7',
  ],
  sources: [
    'noOpCompiler.js',
    'compiler.js',
    'plugin.js',
  ],
});

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('akryum:npm-check@0.1.0');
  api.addFiles([
    'npm.json',
  ], 'server');
  api.imply('ecmascript@0.10.7');
});
