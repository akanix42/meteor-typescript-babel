import { Babel, BabelCompiler } from 'meteor/babel-compiler';
import { transform } from '@babel/core';
import ignore from 'ignore';

export default class TypeScriptCompiler extends BabelCompiler {
  constructor() {
    super({
      react: true,
    });
  }

  /**
   * Pass in the TypeScript compilation source map.
   **/
  inferExtraBabelOptions(inputFile, babelOptions, cacheDeps) {
    const result = super.inferExtraBabelOptions(
      inputFile,
      babelOptions,
      cacheDeps,
    );

    babelOptions.plugins = babelOptions.plugins || [];

    babelOptions.plugins.unshift(
      inputFile.require('@babel/plugin-transform-typescript'),
    );
    return result;
  }

  /**
   * Process all files so we can removed ignored files before handing off to the Babel Compiler
   **/
  processFilesForTarget(inputFiles) {
    inputFiles = this.removeIgnoredFiles(inputFiles);
    super.processFilesForTarget(inputFiles);
  }

  removeIgnoredFiles(inputFiles) {
    const ignoreFile = inputFiles.find(
      (inputFile) => inputFile.getBasename() === '.tsignore',
    );

    if (!ignoreFile) {
      return inputFiles;
    }

    const ignoredFiles = ignore().add(ignoreFile.getContentsAsString());
    ignoredFiles.add('**/.tsignore');
    const filter = ignoredFiles.createFilter();
    return inputFiles.filter((inputFile) =>
      filter(inputFile.getPathInPackage()),
    );
  }

  processOneFileForTarget(inputFile) {
    const result = super.processOneFileForTarget(inputFile);
    if (result) {
      result.path = result.path.replace(/\.ts(x)?/, '.js$1');
      return result;
    }
  }
}
