import React from 'react';

const TabHeader = (props) => {
  return (
    <React.Fragment>
      <h3>{props.heading}</h3>
      <hr/>
    </React.Fragment>
  )
};

export default TabHeader;
