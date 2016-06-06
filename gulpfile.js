
var gulp = require('gulp');
var path = require('path');

var opts = {
  pageDef: {
    adsByGoogle: false,
    title: 'Lucify Bar Chart Range Selector – Example'
  },
  assetContext: 'lucify-bar-chart-range-selector-example/',
  entryPoint: path.resolve('src/js/entry-point.jsx'),
};

var builder = require('lucify-component-builder');
builder(gulp, opts);
