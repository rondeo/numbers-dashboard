import React, { Component } from 'react';

class CreateAccountTab extends Component {

  componentDidMount() {
    console.log("CreateAccountTab componentDidMount");
  }

  render() {
    return (
      <div className="tab-pane active" id="createaccount">
        Create Profile Tab
      </div>
    );
  }

}

export default CreateAccountTab;
