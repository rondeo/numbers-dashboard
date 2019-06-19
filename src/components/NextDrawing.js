import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NextDrawing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cssClass: 'card-link'
    };
  }

  handleClick() {
    this.setState({
      cssClass: 'card-link ' + new Date().getTime()
    });
  }

  render() {
    const date = new Date(this.props.next);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const displayDate = date.toLocaleDateString("en-US", options);

    return (
      <div className="card">
        <h5 className="card-header text-center">Next Drawing</h5>
        <div className="card-body">
          <p className="card-text text-center" style={{fontSize: '25px'}}>{displayDate}</p>
          <div className="card-link text-danger font-weight-bold text-center">Estimated Jackpot {this.props.jackpot.amount}</div>
        </div>
        <div className="card-footer text-center">
          <Link className="card-link" to="/jackpots" onClick={() => this.handleClick()}>
            View All Jackpots
          </Link>
        </div>
      </div>
    );
  }

}

export default NextDrawing;
