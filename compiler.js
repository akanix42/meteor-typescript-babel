import { Babel, BabelCompiler } from 'meteor/babel-compiler';
import { transform } from '@babel/core';

const defaultBabelOptions = {
  compact: false,
  ast: false,
  babelrc: false,
  sourceMaps: true,
  presets: ['@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-syntax-decorators',
    '@babel/plugin-syntax-jsx',
  ],
};

export default class TypeScriptCompiler extends BabelCompiler {
  constructor() {
    super({
      react: true
    });
  }

  /**
   * Pass in the TypeScript compilation source map.
   **/
  inferExtraBabelOptions(inputFile, babelOptions, cacheDeps) {
    const result = super.inferExtraBabelOptions(inputFile, babelOptions, cacheDeps);
    babelOptions.inputSourceMap = inputFile.inputSourceMap;

    return result;
  }

  /**
   * The meteor-babel package used by babel-compiler runs reify first, which errors out on some TypeScript syntax:
   * For example, the `as` keyword causes an error:
   *      const a: string = 123 as any as string;
   * As a result, we must first use @babel/core to run the TypeScript transform before handing things off to the
   * babel-compiler package.
   **/
  processOneFileForTarget(inputFile) {
    const source = inputFile.getContentsAsString();
    const babelOptions = { ...defaultBabelOptions };
    const inputFilePath = inputFile.getPathInPackage();
    const packageName = inputFile.getPackageName();

    /**
     * TODO: These babel options were copied from the babel-compiler package. Are they necessary?
     **/
    babelOptions.filename = babelOptions.sourceFileName =
      packageName
        ? 'packages/' + packageName + '/' + inputFilePath
        : inputFilePath;

    babelOptions.sourceMapTarget = babelOptions.filename + '.map';
    /*  END TO DO */

    let result = this.compile(source, babelOptions).await();
    /**
     * Set the source map on the input file so we can add it to the babel options later
     **/
    inputFile.inputSourceMap = result.map;
    result = super.processOneFileForTarget(inputFile, result.code);
    result.path = result.path.replace(/\.ts(x)?/, '.js$1');

    return result;
  }

  /**
   * Promisify Babel TypeScript compilation
   **/
  compile(source, babelOptions) {
    return new Promise((resolve, reject) => {
      transform(source, babelOptions, function (err, result) {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }
}
