import React, { Component } from 'react';
import Refresh from '../Refresh';

class MyPicksTab extends Component {

  componentDidMount() {
    console.log("MyPicksTab componentDidMount");
  }

  refreshContent() {
    //this.props.fetchData();
  }

  render() {
    return (
      <div className="tab-pane" id="home">
        <h3>
          My Picks
          <Refresh onClick={() => this.refreshContent()} />
        </h3>
        <hr/>
      </div>
    );
  }

}

export default MyPicksTab;
