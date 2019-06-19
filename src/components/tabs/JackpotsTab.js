import React, { Component } from 'react';
import Refresh from '../Refresh';

class JackpotsTab extends Component {

  componentDidMount() {
    console.log("JackpotsTab componentDidMount");
  }

  refreshContent() {
    //this.props.fetchData();
  }

  render() {
    return (
      <div className="tab-pane" id="home">
        <h3>
          Jackpots
          <Refresh onClick={() => this.refreshContent()} />
        </h3>
        <hr/>
      </div>
    );
  }

}

export default JackpotsTab;
