var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var CLIENT_PATH = path.resolve(SRC_PATH, 'client', 'index');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var common = {
  entry: CLIENT_PATH,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ["node_modules", SRC_PATH]
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /.*\.scss$/,
        include: SRC_PATH,
        loader: 'style-loader!css-loader!autoprefixer!sass-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: SRC_PATH,
        query: {
          optional: ['runtime'],
          stage: 0,
          env: {
            development: {
              plugins: ["react-transform"],
              extra: {
                "react-transform": {
                  transforms: [{
                    transform: "react-transform-hmr",
                    imports: ["react"],
                    locals: ["module"]
                  }]
                }
              }
            }
          }
        }
      },

      // for certain libs
      {
        test: /\.js?$/,
        loader: 'babel',
        include: [path.resolve(ROOT_PATH, 'node_modules/qs')],
      }
    ]
  }
};

// default to common
module.exports = common;

if(process.env.NODE_ENV === 'development') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
      CLIENT_PATH
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  });
}

if(process.env.NODE_ENV === 'production') {
  module.exports = merge(common, {
    devtool: 'source-map',
    entry: CLIENT_PATH,
    plugins: [
      new Clean(['dist']),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    ],
  });
}
