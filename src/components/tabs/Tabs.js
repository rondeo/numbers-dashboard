import React, { Component } from 'react';
import HomeTab from './HomeTab';
import MyPicksTab from './MyPicksTab';
import LoginTab from './LoginTab';
import FavoritesTab from './FavoritesTab';
import DrawingsTab from './DrawingsTab';
import WhiteballNumbersTab from './WhiteballNumbersTab';
import PowerballNumbersTab from './PowerballNumbersTab';
import JackpotsTab from './JackpotsTab';
import EditProfileTab from './EditProfileTab';
import CreateAccountTab from './CreateAccountTab';

class Tabs extends Component {
  render() {
    return (
      <div className="tab-content" style={{padding: ".75rem"}} id="myTabs">
        <div className="tab-pane active" id="home">
          <HomeTab/>
        </div>
        <div className="tab-pane" id="myPicks">
          <MyPicksTab/>
        </div>
        <div className="tab-pane" id="favorites">
          <FavoritesTab/>
        </div>
        <div className="tab-pane" id="drawings">
          <DrawingsTab/>
        </div>
        <div className="tab-pane" id="whiteballNumbers">
          <WhiteballNumbersTab/>
        </div>
        <div className="tab-pane" id="powerballNumbers">
          <PowerballNumbersTab/>
        </div>
        <div className="tab-pane" id="jackpots">
          <JackpotsTab/>
        </div>
        <div className="tab-pane" id="login">
          <LoginTab/>
        </div>
        <div className="tab-pane" id="editProfile">
          <EditProfileTab/>
        </div>
        <div className="tab-pane" id="createAccount">
          <CreateAccountTab/>
        </div>
      </div>
    );
  }
}

export default Tabs;
