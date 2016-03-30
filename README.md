
# A selectable stacked bar chart React component

##  About

This is a pre-release of a package belonging to the Lucify platform. It has been
published to satisfy dependencies of other packages. Any APIs may change without
notice.

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
