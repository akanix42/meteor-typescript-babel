import TypeScriptCompiler from './compiler';

Plugin.registerCompiler({
  extensions: ['ts', 'tsx'],
}, function () {
  return new TypeScriptCompiler();
});
