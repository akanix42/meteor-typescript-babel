import { BabelCompiler } from 'meteor/babel-compiler';

export default class TypeScriptCompiler extends BabelCompiler {
  constructor() {
    super({
      react: true
    });
  }

  inferExtraBabelOptions(inputFile, babelOptions, cacheDeps) {
    const result = super.inferExtraBabelOptions(inputFile, babelOptions, cacheDeps);

    if (!babelOptions.presets) {
      babelOptions.presets = [];
    }

    /**
     * If @babel/preset-typescript is not listed in the .babelrc file, add it here.
     **/
    const fn = inputFile.require('@babel/preset-typescript').default;
    if (!babelOptions.presets.find(preset => preset === fn || (Array.isArray(preset) && preset[0] === fn))) {
      babelOptions.presets.push(fn);
    }

    return result;
  }
}
