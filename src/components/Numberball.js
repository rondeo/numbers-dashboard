import React from 'react';
import DrawingNumber from './DrawingNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Numberball = (props) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3" style={{paddingBottom: "30px"}}>
      <div className="card">

        <div className="card-body">

          <div className="media">
            <div className="align-self-center mr-3">
              <DrawingNumber number={props.number}/>
            </div>
            <div className="media-body">
              <h5 className="mt-0">
                Frequency {props.number.hitCount}
                <div className="dropdown float-right">
                  <div id="numberOptions" data-toggle="dropdown">
                    <FontAwesomeIcon icon="plus" size="xs" style={{cursor:"pointer"}} />
                  </div>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="numberOptions">
                    <a className="dropdown-item" href="#view">View Details for {props.number.name}</a>
                    <a className="dropdown-item" href="#add">Add {props.number.name} to My Picks</a>
                  </div>
                </div>
              </h5>
              <hr/>
              Last Drawn on {props.number.lastDrawDate}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
};

export default Numberball;
