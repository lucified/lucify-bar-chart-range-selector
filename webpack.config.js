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
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  externals: {
    'react': 'React',
    'd3': 'd3'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }
};

module.exports = config;
