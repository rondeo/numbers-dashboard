import React, { Component } from 'react';
import './charts.css';

class DonutChart extends Component {

  constructor(props) {
    super(props);
    this.state = {donutValue: 0};
  }

  animate() {
    if(this.state.donutValue < this.props.value) {
      this.setState((prevState) => {
        // Important: read `prevState` instead of `this.state` when updating.
        return {donutValue: prevState.donutValue + 1}
      });
      setTimeout(() => this.animate(), 1);
    }
  }

  componentDidMount() {
    this.animate();
  }

  render() {
    const halfsize = this.props.size * 0.5;
    const radius = halfsize - this.props.strokewidth * 0.5;
    const circumference = 2 * Math.PI * radius;
    //const strokeval = this.props.value * circumference / 100;
    const strokeval = this.state.donutValue * circumference / 100;
    const dashval = strokeval + ' ' + circumference;

    const trackstyle = { strokeWidth: this.props.strokewidth };
    const indicatorstyle = { strokeWidth: this.props.strokewidth, strokeDasharray: dashval };
    const rotateval = 'rotate(-90 ' + halfsize + ',' + halfsize + ')';

    return (
      <svg width={ this.props.size } height={ this.props.size } className="donutchart donut-animate-pulse">
        <circle r={ radius } cx={ halfsize } cy={ halfsize } transform={ rotateval } style={ trackstyle } className="donutchart-track"></circle>
        <circle r={ radius } cx={ halfsize } cy={ halfsize } transform={ rotateval } style={ indicatorstyle } className="donutchart-indicator"></circle>
        <text x={ halfsize + 5 } y={ halfsize + 10 } style={ { textAnchor: 'middle' } } className="donutchart-text">
          <tspan className="donutchart-text-val">{ this.props.value }</tspan>
          <tspan className="donutchart-text-percent">%</tspan>
        </text>
      </svg>
    );
  }

}

DonutChart.defaultProps = {
  value: 0,
  valuelabel: 'Completed',
  size: 140,
  strokewidth: 26
};

export default DonutChart;
