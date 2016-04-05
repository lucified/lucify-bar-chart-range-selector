
import React from 'react';
import d3 from 'd3';
import Bar from './bar.jsx';

import styles from '../../assets/scss/bar-chart-range-selector.scss';


export default class BarChartRangeSelector extends React.Component {

  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    selectedRange: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    margin: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
    customColors: React.PropTypes.arrayOf(React.PropTypes.array),
    onChange: React.PropTypes.func,
    xTickFormat: React.PropTypes.func.isRequired,
    yTickFormat: React.PropTypes.func.isRequired,
    xTickValues: React.PropTypes.array,
    rangeFormat: React.PropTypes.func.isRequired,
    onMouseOver: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    incompleteDataIndices: React.PropTypes.arrayOf(React.PropTypes.number),
  }


  static defaultProps = {
    height: 160,
    width: 1000,
    margin: {
      top: 5,
      right: 2,
      bottom: 20,
      left: 10,
    },
    xTickFormat: d3.format('n'),
    yTickFormat: d3.format('s'),
    rangeFormat: d => d,
    incompleteDataIndices: [],
  }


  constructor(props) {
    super(props);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }


  state = {
    brushing: false,
  }


  componentDidMount() {
    this.drawAxes();
    this.initializeSelectionHandlers();
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.customColors !== this.props.customColors) {
      this._colors = null;
    }

    if (nextProps.data !== this.props.data) {
      this._enrichedData = null;
      this._yScale = null;
      this._xScale = null;
      this._yAxis = null;
      this._xAxis = null;
    }

    if (nextProps.width !== this.props.width) {
      this._xAxis = null;
      this._xScale = null;
    }
  }


  componentDidUpdate(prevProps, _prevState) {
    if (this.props.data !== prevProps.data ||
        this.props.width !== prevProps.width) {
      this.drawAxes();
      this.updateRangeBrush();
    }

    if (this.props.selectedRange !== prevProps.selectedRange) {
      this.updateRangeBrush();
    }
  }


  getSelectedRange() {
    return [
      this.props.selectedRange[0],
      // This is an annoying hack. We need the extent to cover the whole last
      // bar chart area, which basically means going to the next boundary, i.e.
      // increase the end range by one. This needs to be converted back to the
      // "actual" range when passing the changes back to the parent component,
      // which is done in handleRangeChange
      this.props.selectedRange[1] + 1,
    ];
  }


  getXAxis() {
    if (!this._xAxis) {
      this._initializeScales();
    }

    return this._xAxis;
  }


  getYAxis() {
    if (!this._yAxis) {
      this._initializeScales();
    }

    return this._yAxis;
  }


  getXScale() {
    if (!this._xScale) {
      this._initializeScales();
    }

    return this._xScale;
  }


  getYScale() {
    if (!this._yScale) {
      this._initializeScales();
    }

    return this._yScale;
  }


  // We want the content to be placed on integer pixel values.
  // The content width needs to be a multiple of the number of bars.
  getContentWidth() {
    const margin = this.props.margin;
    const fullWidth = this.props.width - margin.left - margin.right;
    const dataLength = this.getEnrichedData().length;

    return fullWidth - (fullWidth % dataLength);
  }


  getContentHeight() {
    return this.props.height - this.props.margin.top - this.props.margin.bottom;
  }


  getEnrichedData() {
    if (!this._enrichedData) {
      this._enrichedData = this._generateEnrichedData(this.props.data);
    }

    return this._enrichedData;
  }


  getColors() {
    if (!this._colors) {
      this._colors = this._generateColors();
    }

    return this._colors;
  }


  getRangeLabels() {
    const range = this.getSelectedRange();
    const xScale = this.getXScale();
    const labelsDistance = Math.abs(xScale(range[1]) - xScale(range[0]));

    // Don't show range label if the endpoints are close to each other to
    // prevent overlap of labels
    if (!this.state.brushing || (labelsDistance < 40)) {
      return null;
    }

    const y = this.props.height -
      (this.props.margin.bottom + this.props.margin.top) + 18;

    return (
      <g className={styles['range-labels']}>
        <text key="range-label-start" textAnchor="middle"
          transform={`translate(${xScale(range[0])},${y})`}
        >
          {this.props.rangeFormat(range[0])}
        </text>
        <text key="range-label-end" textAnchor="middle"
          transform={`translate(${xScale(range[1])},${y})`}
        >
          {this.props.rangeFormat(range[1])}
        </text>
      </g>
    );
  }


  getBars() {
    const data = this.getEnrichedData();
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const colors = this.getColors();
    const contentWidth = this.getContentWidth();
    const selectedRange = this.getSelectedRange();
    let barWidth = contentWidth / data.length;
    let barPadding = 0;

    // padding of 1px between bars if bars are wide enough
    if (barWidth > 4) {
      barWidth--;
      barPadding = 1;
    }

    return data.map(d => {
      const item = {
        index: d.key,
        value: d.total,
      };

      const containsIncompleteData =
        this.props.incompleteDataIndices.indexOf(d.key) >= 0;

      const bars = d.values.map(c =>
        <Bar key={`${d.key}-${c.key}`}
          width={barWidth}
          y0={c.y0}
          y1={c.y1}
          scale={yScale}
          fill={containsIncompleteData ? 'url(#diagonalHatch)' : colors(c.key)}
          selected={d.key >= selectedRange[0] && d.key < selectedRange[1]}
        />
      );

      return (
        <g key={d.key} className={styles['bar-group']}
          transform={`translate(${xScale(d.key) + barPadding},0)`}
          onMouseOver={this.handleMouseOver.bind(this, item)}
          onMouseLeave={this.handleMouseLeave}
        >
          {bars}
        </g>
      );
    });
  }


  drawAxes() {
    d3.select(this.refs.xAxis.getDOMNode())
      .call(this.getXAxis());

    d3.select(this.refs.yAxis.getDOMNode())
      .call(this.getYAxis());
  }


  _initializeScales() {
    const contentHeight = this.getContentHeight();
    const contentWidth = this.getContentWidth();
    const data = this.getEnrichedData();

    const extent = d3.extent(data, item => parseInt(item.key, 10));

    this._xScale = d3.scale.linear()
      .domain([extent[0], extent[1] + 1])
      .rangeRound([0, contentWidth]);

    this._yScale = d3.scale.linear()
        .domain([0, d3.max(data, d => d.total)])
        .range([contentHeight, 0]);

    this._xAxis = d3.svg.axis()
        .orient('bottom')
        .tickSize(5, 5)
        .scale(this._xScale)
        .tickFormat(this.props.xTickFormat);

    if (this.props.xTickValues) {
      this._xAxis.tickValues(this.props.xTickValues);
    }

    this._yAxis = d3.svg.axis()
        .orient('left')
        .tickFormat(this.props.yTickFormat)
        .ticks(3)
        .tickSize(4, 0)
        .scale(this._yScale);
  }


  initializeSelectionHandlers() {
    const contentHeight = this.getContentHeight();

    this.brush = d3.svg.brush()
      .x(this.getXScale())
      .extent(this.getSelectedRange())
      .on('brushstart', this.brushStart.bind(this))
      .on('brushend', this.brushEnd.bind(this))
      .on('brush', this.brushed.bind(this));

    d3.select(this.refs.brush.getDOMNode())
      .call(this.brush)
      .selectAll('rect')
        .attr('height', contentHeight + 5)
        .attr('transform', 'translate(0, -5)');
  }


  brushStart() {
    d3.select(this.refs.xAxis.getDOMNode())
      .selectAll('text')
      .classed(styles.hide, true);
    this.setState({ brushing: true });
  }


  brushEnd() {
    d3.select(this.refs.xAxis.getDOMNode())
      .selectAll('text')
      .classed(styles.hide, false);
    this.setState({ brushing: false });
  }


  updateRangeBrush() {
    this.brush
      .x(this.getXScale())
      .extent(this.getSelectedRange());
    d3.select(this.refs.brush.getDOMNode())
      .call(this.brush);
  }


  // based on http://bl.ocks.org/mbostock/6232620
  brushed() {
    const extent = this.brush.extent();
    let roundedExtent;

    // if dragging, preserve the width of the extent
    if (d3.event.mode === 'move') {
      const diff = Math.round(extent[1] - extent[0]);

      if (diff === 0) {
        return;
      }

      const d1 = Math.round(extent[1]);
      const d0 = Math.round(d1 - diff);

      roundedExtent = [d0, d1];
    } else { // otherwise, if resizing, round both
      roundedExtent = extent.map(Math.round);

      // if empty when rounded, use floor & ceil instead
      if (roundedExtent[0] >= roundedExtent[1]) {
        roundedExtent[0] = Math.floor(extent[0]);
        roundedExtent[1] = Math.ceil(extent[1]);
      }
    }

    this.handleRangeChange(roundedExtent);
  }


  // Calculates the positions for the bars
  // and adds them to the returned data structure
  _generateEnrichedData(data) {
    const enrichedData = data.slice();

    enrichedData.forEach(barGroup => {
      let y0 = 0;
      // store the heights of the bars
      barGroup.values.forEach(bar => {
        bar.y0 = y0; // eslint-disable-line
        y0 += +bar.values;
        bar.y1 = y0; // eslint-disable-line
      });
    });

    return enrichedData;
  }


  _generateColors() {
    const customColors = this.props.customColors;
    const data = this.getEnrichedData();

    if (customColors) {
      return d3.scale.ordinal()
        .domain(customColors.map(d => d[0]))
        .range(customColors.map(d => d[1]));
    }

    const domain = d3.set(d3.merge(data.map(c => c.values.map(d => d.key)))).values();
    return d3.scale.ordinal()
      .domain(domain)
      // from https://github.com/mbostock/d3/wiki/Ordinal-Scales#category20c
      .range(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d', '#fd8d3c',
        '#fdae6b', '#fdd0a2', '#31a354', '#74c476', '#a1d99b', '#c7e9c0',
        '#756bb1', '#9e9ac8', '#bcbddc', '#dadaeb', '#636363', '#969696', '#bdbdbd']);
  }


  handleRangeChange(range) {
    if (this.props.onChange) {
      // subtract 1 because the end extent is one larger than the actual value
      // to include the proper bar graphs in d3.brush.extent()
      this.props.onChange([range[0], range[1] - 1]);
    }
  }


  handleMouseOver(item) {
    if (this.props.onMouseOver && !this.state.brushing) {
      this.props.onMouseOver(item);
    }
  }


  handleMouseLeave() {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  }


  render() {
    const margin = this.props.margin;
    const contentHeight = this.getContentHeight();
    const contentWidth = this.getContentWidth();
    const fullWidth = this.props.width - margin.left - margin.right;
    const additionalLeftPadding = Math.floor((fullWidth - contentWidth) / 2);

    return (
      <svg className={styles.chart}
        height={this.props.height}
        width={this.props.width}
      >
        <defs>
          <pattern id="diagonalHatch" patternUnits="userSpaceOnUse"
            width={4} height={4}
          >
            <path className="chart-missing" d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
              stroke="rgb(0, 111, 185)"
              strokeWidth={2}
            />
          </pattern>
        </defs>
        <g transform={`translate(${additionalLeftPadding + margin.left}, ${margin.top})`}>
          <rect className={styles.background}
            width={contentWidth} height={contentHeight}
          />
          <g ref="xAxis" className={`x ${styles.axis}`}
            transform={`translate(0,${contentHeight})`}
          />
          <g ref="yAxis" className={`y ${styles.axis}`} />
          <g ref="brush" className={styles.brush} />
          {this.getRangeLabels()}
          {this.getBars()}
        </g>
      </svg>
    );
  }
}


BarChartRangeSelector.prototype.displayName = 'BarChartRangeSelector';
