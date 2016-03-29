
import React from 'react';
import d3 from 'd3';

import styles from '../scss/bar.scss';

class Bar extends React.Component {

  static propTypes = {
    y0: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    scale: React.PropTypes.func.isRequired,
    fill: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool
  }


  updateHeight() {
    const scale = this.props.scale;
    const topY = scale(this.props.y1);
    const bottomY = scale(this.props.y0);

    d3.select(this.refs.bar.getDOMNode())
      .transition().duration(250)
      .attr('y', topY)
      .attr('height', bottomY - topY);
  }


  componentDidUpdate(_prevProps, _prevState) {
    this.updateHeight();
  }


  componentDidMount() {
    this.updateHeight();
  }


  shouldComponentUpdate(nextProps, _nextState) {
    return nextProps.y0 !== this.props.y0 ||
      nextProps.y1 !== this.props.y1 ||
      nextProps.scale !== this.props.scale ||
      nextProps.width !== this.props.width ||
      nextProps.fill !== this.props.fill ||
      nextProps.selected !== this.props.selected;
  }


  render() {
    let classes = styles.bar;
    if (this.props.selected) {
      classes += ' ' + styles.selected;
    }

    return (
      <rect
        ref='bar'
        className={classes}
        width={this.props.width}
        fill={this.props.fill} />
    );
  }

}

Bar.prototype.displayName = 'Bar';
