import React from 'react';
import DrawingNumber from './DrawingNumber';

const DrawingNumbers = (props) => {
  return (
    <div className="container">
      <div className="row" style={{paddingBottom: '15px', paddingTop: '10px'}}>
        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 center-column">
          <DrawingNumber number={props.drawing.whiteball_1} />
        </div>
        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 center-column">
          <DrawingNumber number={props.drawing.whiteball_2} />
        </div>
        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 center-column">
          <DrawingNumber number={props.drawing.whiteball_3} />
        </div>
        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 center-column">
          <DrawingNumber number={props.drawing.whiteball_4} />
        </div>
        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 center-column">
          <DrawingNumber number={props.drawing.whiteball_5} />
        </div>
        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 center-column">
          <DrawingNumber number={props.drawing.powerball} />
        </div>
      </div>
    </div>
  )
};

export default DrawingNumbers;
