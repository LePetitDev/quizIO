var isNode = (typeof module !== 'undefined' && module.exports)? true: false
  , React = isNode ? require('react/addons') : window.React;

/**
 * React-C3 Chart
 * Copyright 2015 - Cody Reichert <codyreichert@gmail.com>
 * Updated to use React v.0.13 - Thomas Kim
 */

export default class ChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.chart = null;
  }

  shouldComponentUpdate(nextProps) {
    if(this.props.data.columns.length !== nextProps.data.columns.length) { // shallow check
      return true;
    }
    else if(JSON.stringify(this.props.data.columns) !== JSON.stringify(nextProps.data.columns)) { // deeper check
      return  true;
    }
    return false;
  }

  componentDidMount () {
    if (this.props.type === 'pie') {
      this._generateChart(
        this.props.data.columns,
        this.props.type,
        this.props.element
      );
      io_lib.isPieChartMounted = true;
    }
    else if (this.props.type === 'gauge') {
      this._generateChart(
        this.props.data.columns,
        this.props.type,
        this.props.element
      );
      io_lib.isGaugeChartMounted = true;
    }
    else {
      this._generateVolumeChart(
        this.props.data.columns,
        this.props.type,
        this.props.element
      );
      io_lib.isVolumeChartMounted = true;
    }
    io_lib.update();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data.columns !== this.props.data.columns) {
      if (this.props.type === 'pie' || this.props.type === 'gauge') {
        this._generateChart(
          this.props.data.columns,
          this.props.type,
          this.props.element
        );
      }
      else {
        this._generateVolumeChart(
          this.props.data.columns,
          this.props.type,
          this.props.element
        );
      }
    }
  }

  componentWillUnmount() {
    this._destroyChart();
  }

  _generateVolumeChart(columns, type, element) {
    this.chart = c3.generate({
      bindto: `#${element}`,
      data: {
        x: 'x',
        columns: columns,
        type: 'area',
        xFormat: '%Y-%m-%d %H:%M:%S'
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            rotate: 75
          }
        }
      },
      color: {
        pattern: ['#56b6c5']
      }
    });
  }

  _generateChart(columns, type, element) {
    this.chart = c3.generate({
      bindto: `#${element}`,
      data: {
        columns: columns,
        type: type
      },
      color: {
        pattern: ['#56bbca', '#154655']
      }
    });
  }

  _destroyChart() {
    this.chart.destroy();
  }

  render() {
    return (
      <div className="c3 react-c3" id={this.props.element} style={this.props.styles}>
      </div>
    );
  }
}

ChartComponent.propTypes = {
    data: React.PropTypes.object.isRequired,
    element: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
};

if (isNode) {
  exports.ChartComponent = ChartComponent;
}
