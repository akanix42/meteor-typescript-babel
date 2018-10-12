import { Babel, BabelCompiler } from 'meteor/babel-compiler';
import { transform } from '@babel/core';
import ignore from 'ignore';
import path from 'path';
import fs from 'fs';

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

    const plugins = babelOptions.plugins || (babelOptions.plugins = []);
    /* Remove after Meteor supports babel.config.js */
    const appConfigPath = path.join(process.cwd(), '.babel.temp-preset.js');
    if (fs.existsSync(appConfigPath)) {
      const arch = inputFile.getArch();
      const appConfig = require(appConfigPath)({ arch });
      // console.log('appPreset', appPreset)
      const presets = babelOptions.presets || (babelOptions.presets = []);
      if (Array.isArray(appConfig.presets)) {
        presets.push.apply(presets, appConfig.presets);
      }
      if (Array.isArray(appConfig.plugins)) {
        plugins.unshift.apply(plugins, appConfig.plugins);
      }
    }

    plugins.unshift(
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
    // if (inputFile.getPathInPackage().match(/shared\/test\.ts/)) {
    //   console.log('*************************')
    //   console.log('arch', inputFile.getArch());
    //   console.log('code', result.data);
    //   console.log('-------------------------')
    //
    // }
    result.path = result.path.replace(/\.ts(x)?/, '.js$1');

    return result;
  }
}
