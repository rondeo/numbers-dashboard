import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// Components
import Navbar from './Navbar';
import TabRoutes from './tabs/TabRoutes';
import UserNav from './UserNav';

class Main extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <UserNav/>
          <Navbar/>
          <TabRoutes/>
        </div>
      </Router>
    );
  }
}

export default Main;
