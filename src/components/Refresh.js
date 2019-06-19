import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Refresh = (props) => {  
    return (
        <span className="text-secondary float-right" style={{padding:"0px", paddingRight:"5px", marginTop:"5px"}}>
            <FontAwesomeIcon className="hoverSpinner" icon="redo" size="xs" onClick={props.onClick}/>
        </span>
    );  
};
  
export default Refresh;