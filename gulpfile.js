
var gulp = require('gulp');

var opts = {
  pageDef: {
    adsByGoogle: false,
    title: 'Lucify Bar Chart Range Selector – Example'
  },
  assetContext: 'lucify-bar-chart-range-selector-example/'
};

var builder = require('lucify-component-builder');
builder(gulp, opts);
