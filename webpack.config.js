var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/js');
var BUILD_DIR = path.resolve(__dirname, 'build');

var config = {
  entry: APP_DIR + '/bar-chart-range-selector.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bar-chart-range-selector.js',
    library: 'BarChartRangeSelector',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'd3': 'd3'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [path.join(__dirname, 'build')],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    fallback: path.join(__dirname, 'node_modules')
  }
};

module.exports = config;
