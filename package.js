Package.describe({
  name: 'nathantreid:typescript-babel',
  version: '1.0.1',
  summary: 'Babel compiler plugin for TypeScript files',
  documentation: 'README.md',
  git: 'https://github.com/nathantreid/meteor-typescript-babel.git',
});

Package.registerBuildPlugin({
  name: 'compile-typescript',
  use: ['babel-compiler@7.3.4', 'ecmascript@0.12.7'],
  sources: ['noOpCompiler.js', 'compiler.js', 'plugin.js'],
});

Package.onUse(function(api) {
  api.versionsFrom('1.8');
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('akryum:npm-check@0.1.2');
  api.addFiles(['npm.json'], 'server');
  api.imply('ecmascript@0.12.7');
});

Npm.depends({
  ignore: '3.3.7',
});
