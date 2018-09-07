import TypeScriptCompiler from './compiler';
import NoOpCompiler from './noOpCompiler';

Plugin.registerCompiler(
  {
    extensions: ['ts', 'tsx'],
    filenames: ['.tsignore'],
  },
  function() {
    return new TypeScriptCompiler();
  },
);

Plugin.registerCompiler(
  {
    extensions: ['d.ts'],
  },
  function() {
    return new NoOpCompiler();
  },
);
