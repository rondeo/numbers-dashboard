import React, { Component } from 'react';
import Refresh from '../Refresh';

class FavoritesTab extends Component {

  componentDidMount() {
    console.log("FavoritesTab componentDidMount");
  }

  refreshContent() {
    //this.props.fetchData();
  }

  render() {
    return (
      <div className="tab-pane" id="home">
        <h3>
          Favorites
          <Refresh onClick={() => this.refreshContent()} />
        </h3>
        <hr/>
      </div>
    );
  }

}

export default FavoritesTab;
