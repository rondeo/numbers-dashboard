import React from 'react';
import DrawingNumbers from './DrawingNumbers';

const Drawing = (props) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4" style={{paddingBottom: "30px"}}>
      <div className="card">
        <h5 className="card-header text-center">
          Winning Numbers - {props.drawing.drawingDate}
        </h5>
        <div className="card-body">
          <DrawingNumbers drawing={props.drawing} />
          <div className="card-link text-danger font-weight-bold text-center">Jackpot {props.drawing.jackpotAmount}</div>
        </div>
      </div>
    </div>
  )
};

export default Drawing;
