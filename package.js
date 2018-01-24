Package.describe({
  name: 'nathantreid:typescript-babel',
  version: '0.0.1',
  summary: 'Babel compiler plugin for TypeScript files',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'compile-typescript',
  use: ['babel-compiler@7.0.0'],
  sources: ['plugin.js'],
});

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('akryum:npm-check@0.0.4');
  api.imply('ecmascript@0.10.0');
});

Package.onTest(function (api) {
  api.use(["tinytest", "underscore@1.0.10"]);
  api.use(["es5-shim@4.7.1", "nathantreid:typescript-babel", "babel-compiler@7.0.0"]);

  api.addFiles("transpilation-tests.js", "server");
});
