import React, { Component } from 'react';
import { withRouter } from 'react-router';

class DrawingNumber extends Component {

  handleClick() {
    let { number } = this.props;
    this.props.history.push(`/number/${number.numberType}/${number.name}`, number);
  }

  render() {
    const cssClass = "number " + (this.props.number.numberType === "WHITEBALL" ? "whiteball" : "powerball");
    return (
      <div className={cssClass} onClick={() => this.handleClick()}>
        {this.props.number.name}
      </div>
    );
  }

}

export default withRouter(DrawingNumber);
