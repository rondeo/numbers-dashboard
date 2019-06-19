import React, { Component } from 'react';
import DrawingNumbers from './DrawingNumbers';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class LatestDrawing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cssClass: 'card-link'
    };
  }

  handleClick() {
    this.setState({cssClass: 'card-link ' + new Date().getTime()}); // Removes active class from link
  }

  render() {
    return (
      <div className="card">
        <h5 className="card-header text-center">
          Winning numbers - {this.props.drawing.drawingDate}
        </h5>
        <div className="card-body">
          <DrawingNumbers drawing={this.props.drawing}/>
          <div className="card-link text-danger font-weight-bold text-center">Jackpot {this.props.drawing.jackpotAmount}</div>
        </div>
        <div className="card-footer text-center">
          <Link className={this.state.cssClass} to="/drawings" onClick={() => this.handleClick()}>
            View All Drawings
          </Link>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(null, mapDispatchToProps)(LatestDrawing);
