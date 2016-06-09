var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/js');
var BUILD_DIR = path.resolve(__dirname, 'lib');

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
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader') + '?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          require.resolve('postcss-loader'),
          require.resolve('sass-loader')
        ]
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
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': 'react-dom',
    'd3': 'd3'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [path.join(__dirname, 'lib')],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    fallback: path.join(__dirname, 'node_modules')
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-reporter')
  ],
  plugins: [
    function() {
      this.plugin('done', function(stats) {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
          console.log(stats.compilation.errors);
          process.exit(1); // webpack doesn't exit with status code != 0 if there are errors
        }
      });
    }]
};

module.exports = config;
