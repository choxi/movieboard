var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config');

process.env.BABEL_ENV = 'test';

var webpackConfig = merge(baseWebpackConfig, {
  entry: {}, // karma will set this
  output: {}, // karma will set this
  devtool: 'inline-source-map',
});

// Reference: http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-mocha
      // Set framework to mocha
      'mocha',

      // chai assertian lib
      'chai',

      //sinon mocking, stubbing, and spying lib
      'sinon-chai'
    ],

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec',
    ],

    files: [
      // Reference: https://www.npmjs.com/package/phantomjs-polyfill
      // Needed because React.js requires bind and phantomjs does not support it
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/babel-core/browser-polyfill.js',

      // Grab all files in the tests directory that contain test.
      {pattern: 'src/**/*\.test\.js', watched: false}
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'src/**/*\.test\.js': ['webpack', 'sourcemap'],
    },

    browsers: [
      'PhantomJS'
      // 'Chrome'
    ],

    // Test webpack config
    webpack: webpackConfig,

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    }
  });
};
