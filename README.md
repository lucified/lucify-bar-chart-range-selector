
# A selectable stacked bar chart React component

A [controlled](https://facebook.github.io/react/docs/forms.html) stacked bar
chart React component that allows users to select a range of the stacked
bars. Built using React and D3.js.

![Animated GIF of component](bar-chart-range-selector.gif)

This is a pre-release of a package belonging to the Lucify platform. It has been
published to satisfy dependencies of other packages. Any APIs may change without
notice.

## Installation

Add `lucify-bar-chart-range-selector` along with its dependencies (React.js and
D3.js) to your project's dependencies:

```shell
$ npm install react d3 lucify-bar-chart-range-selector --save
```

Require it in your Javascript:

#### ES5
```javascript
var LucifyBarChartRangeSelector = require('lucify-bar-chart-range-selector').default;
```

#### ES6
```javascript
import LucifyBarChartRangeSelector from 'lucify-bar-chart-range-selector';
```

Now you can use it like any other React component.

## Props

- `data` _(required)_: The array of data objects. Has the following format:

  ```javascript
  [
    {
      key: 606, // integer index, either as a string or int. should be adjacent integers
      total: 58, // sum of "values" fields of objects in values array
      values: [ // each object in this array is represented by a stacked bar
        {
          key: "Foo",
          values: 4
        },
        {
          key: "Bar",
          values: 30
        },
        {
          key: "Baz",
          values: 10
        },
        {
          key: "Hey",
          values: 14
        }
      ]
    },
    {
      key: 607,
      ...
    },
    ...
  ]
  ```

- `selectedRange`: An array of two integers that denote the indices of the
  selected range.
- `height`: The height of the component in pixels. Default: `160`
- `width`: The width of the component in pixels. Default: `1000`
- `margin`: An object with `top`, `bottom`, `left` and `right` properties that
  denote internal margins for the chart.
  Default: `{ top: 5, right: 2, bottom: 20, left: 10 }`
- `customColors`: An array of two-member arrays to define custom fill colors for
  bars. The first member of each array is a string of the `key` property of the
  bar, and the second member of the array is a string of the fill color.
- `onChange`: The function that should be called when the selection range
  changes. Is passed a two-member array that includes the extent of the
  selection in based on the `key` value of the bar groups.
- `xTickFormat`: Function that formats x axis tick labels. Is passed the `key`
  value of the bar group. Default: `d3.format('n')`
- `yTickFormat`: Function that formats y axis tick labels. Is passed the
  `values` value. Default: `d3.format('s')`
- `xTickValues`: An array of the values that should be displayed on the x axis.
- `rangeFormat`: Function that formats the x axis labels when selecting a range.
  Default: the identity function
- `onMouseOver`: Function to be called when the user hovers on a bar group. Is
  passed an object parameter that contains the `index` (key value of the group)
  and `value` (total value of the group) properties.
- `onMouseLeave`: Function to be called when the user no longer hovers on a bar
  group.
- `incompleteDataIndices`: An array of the indices of the bar groups that should
  be displayed with a thatched pattern. Useful for indicating if some data is
  incomplete. Default: `[]`


## CSS classes

TODO


## Development

Build the Javascript files into `lib/` with:

```shell
$ npm run build
```

Or build the development version and start watching for changes with:

```shell
$ npm run dev
```

To serve the example page on port 3000 and see changes live, start Gulp:

```shell
$ gulp
```

Then point your browser to http://localhost:3000/


## Developing as part of a project

To develop this component in tandem with a parent project using `npm link`,
first link this project to the parent project:

```shell
$ cd path_to_this_project
$ npm link
$ cd path_to_parent_project
$ npm link lucify-bar-chart-range-selector
```

Then link the parent project's React folder to this project:

```shell
$ cd path_to_parent_project
$ cd node_modules/react
$ npm link
$ cd path_to_this_project
$ npm link react
```

This is needed in order to prevent React from being loaded twice.

Note that if you do not use Webpack to build your parent project, the
development build will likely not work. You can build the production version
while watching for changes by running `node_modules/.bin/webpack -p --watch`.
