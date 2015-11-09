'use strict';
let babel = require('babel-core');

module.exports = (wallaby) => {
  var babelCompiler = wallaby.compilers.babel({
    babel: babel,
    presets: ['es2015']
  });

  return {
    files: [
      'src/*.js',
      'src/lib/*.js',
      '!src/**/*.test.js'
    ],

    tests: [
      'src/**/*.test.js'
    ],


    compilers: {
      '**/*.js*': babelCompiler
    },

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'mocha@2.1.0'
  };
};
