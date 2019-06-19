import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faListAlt, faHome, faStar, faMoneyBillWave, faChartBar, faTh, faUserCircle, faSyncAlt, faRedo, faEllipsisH, faPlus  } from '@fortawesome/free-solid-svg-icons';
//import { faCheck, faCaretUp, faCaretDown  } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown, faAngleUp, faBars, faTable } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faListAlt, faHome, faStar, faMoneyBillWave, faChartBar, faTh, faUserCircle, faSyncAlt, faRedo, faEllipsisH, faPlus, faAngleDown, faAngleUp, faBars);
library.add(faTable);
library.add(faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight);

class App extends Component {
  render() {
    return (
      <Main />
    );
  }
}

export default App;
